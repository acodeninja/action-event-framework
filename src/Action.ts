import {parsePascal} from "./Helpers/String";

export interface ActionInterface {
  readonly action: string;
  payload?: Record<string, unknown>;
}

export class Action implements ActionInterface {
  payload?: Record<string, unknown>;

  get action() {
    return parsePascal(this.constructor.name).join(':');
  }

  static create(payload: Record<string, unknown>) {
    const action = <ActionInterface>new this();

    action.payload = payload;

    return action;
  }
}
