import {parsePascal} from "./Helpers/String";

export interface ActionInterface {
  readonly action: string;
  payload?: Record<string, unknown>;
  execute(): Promise<void>;
  implementation?(): Promise<void>;
}

export class Action implements ActionInterface {
  payload?: Record<string, unknown>;
  implementation?(): Promise<void>;

  get action() {
    return parsePascal(this.constructor.name).join(':');
  }

  async execute(): Promise<void> {
    if (this.implementation) await this.implementation();
  }

  static create(payload: Record<string, unknown>) {
    const action = <ActionInterface>new this();

    action.payload = payload;

    return action;
  }
}
