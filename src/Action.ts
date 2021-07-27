import {EventEmitter} from "events";
import {parsePascal} from "./Helpers/String";
import {Event} from "./Event";

export interface ActionInterface {
  readonly action: string;
  successEvents?: Array<typeof Event>;
  payload?: Record<string, unknown>;
  execute(emitter: EventEmitter): Promise<void>;
  implementation?(): Promise<void>;
}

export class Action implements ActionInterface {
  successEvents?: Array<typeof Event>;
  payload?: Record<string, unknown>;
  implementation?(): Promise<void>;

  get action() {
    return parsePascal(this.constructor.name).join(':');
  }

  async execute(emitter: EventEmitter): Promise<void> {
    if (this.implementation) await this.implementation();

    this.successEvents?.forEach((event: typeof Event) => {
      const instance = new event;

      emitter.emit(instance.event, instance);
    })
  }

  static create(payload: Record<string, unknown>) {
    const action = <ActionInterface>new this();

    action.payload = payload;

    return action;
  }
}
