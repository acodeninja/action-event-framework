import {parsePascal} from "./Helpers/String";

export interface EventInterface {
  readonly event: string;
}

export class Event implements EventInterface {
  get event() {
    return parsePascal(this.constructor.name).join(':');
  }
}
