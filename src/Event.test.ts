import {describe, expect, test} from "@jest/globals";
import {Event} from "./Event";

class TestEvent extends Event {

}

describe('a newly instantiated Event', () => {
  const event = new TestEvent();

  test('has an appropriate event name', () => {
    expect(event).toHaveProperty('event', 'test:event');
  });
});
