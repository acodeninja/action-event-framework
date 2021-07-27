import {parsePascal} from './Helpers/String';

export interface EventInterface {
  readonly event: string;
  error?: Error;
}

export class Event implements EventInterface {
  error?: Error;

  get event(): string {
    return parsePascal(this.constructor.name).join(':');
  }
}
