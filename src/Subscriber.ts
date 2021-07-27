import {EventEmitter} from 'events';
import {Event} from './Event';

export interface SubscriberInterface {
  events: Array<typeof Event>;
  implementation?(event: Event): Promise<void>;
  execute(event: Event): Promise<void>;
}

export class Subscriber implements SubscriberInterface {
  events: Array<typeof Event>;
  implementation?(event: Event): Promise<void>;

  async execute(event: Event): Promise<void> {
    if (this.implementation) await this.implementation(event);
  }

  static create(emitter: EventEmitter): SubscriberInterface {
    const subscriber = <SubscriberInterface>new this;

    subscriber.events?.forEach(event => {
      emitter.on((new event).event, subscriber.execute.bind(subscriber));
    });

    return subscriber;
  }
}
