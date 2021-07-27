import {parsePascal} from "./Helpers/String";

export interface ActionInterface {
  readonly action: string;
}

export class Action implements ActionInterface {
  get action() {
    return parsePascal(this.constructor.name).join(':');
  }
}
