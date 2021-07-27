import {parsePascal} from './Helpers/String';
import {Event} from './Event';
import {EventAdapterInterface} from './Adapters/EventAdapter';

export interface ActionInterface {
  readonly action: string;
  successEvents?: Array<typeof Event>;
  failureEvents?: Array<typeof Event>;
  payload?: Record<string, unknown>;
  execute(emitter: EventAdapterInterface): Promise<void>;
  implementation?(): Promise<void>;
}

export class Action implements ActionInterface {
  successEvents?: Array<typeof Event>;
  failureEvents?: Array<typeof Event>;
  payload?: Record<string, unknown>;
  implementation?(): Promise<void>;

  get action(): string {
    return parsePascal(this.constructor.name).join(':');
  }

  async execute(emitter: EventAdapterInterface): Promise<void> {
    try {
      if (this.implementation) await this.implementation();

      this.successEvents?.forEach((event: typeof Event) => {
        const instance = new event;

        emitter.emit(instance.event, instance);
      });
    } catch (error) {
      this.failureEvents?.forEach((event: typeof Event) => {
        const instance = new event;

        instance.error = error;

        emitter.emit(instance.event, instance);
      });
    }
  }

  static create(payload: Record<string, unknown>): ActionInterface {
    const action = <ActionInterface>new this();

    action.payload = payload;

    return action;
  }
}
