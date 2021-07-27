import {EventInterface} from '../Event';

export interface EventAdapterInterface {
  emit(event: string, body: EventInterface): void;
  on(event: string, callback: (event: EventInterface) => void): void;
}
