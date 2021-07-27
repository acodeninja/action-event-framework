import {beforeAll, describe, expect, jest, test} from '@jest/globals';
import {EventEmitter} from 'events';
import {Subscriber} from './Subscriber';
import {Event} from './Event';

class TestEvent extends Event {

}

class TestSubscriber extends Subscriber {
  events = [TestEvent];

  async implementation(event: Event) {
    if (event) return;
  }
}

describe('a subscriber listening for an event', () => {
  const emitter = new EventEmitter();
  const subscriber = TestSubscriber.create(emitter);

  subscriber.implementation = jest.fn(subscriber.implementation);

  beforeAll(async () => {
    await emitter.emit('test:event', new TestEvent);
    await emitter.emit('test:no-event', {event: 'no-event'});
  });

  test('runs when the event emitted', () => {
    expect(subscriber.implementation).toHaveBeenCalledWith(new TestEvent);
  });

  test('does not run when an unsubscribed event is emitted', () => {
    expect(subscriber.implementation).not.toHaveBeenCalledWith({event: 'no-event'});
  });
});
