import {describe, expect, test} from "@jest/globals";
import {Action} from "./Action";

class TestAction extends Action {

}

describe('a newly instantiated Action', () => {
  const event = new TestAction();

  test('has an appropriate event name', () => {
    expect(event).toHaveProperty('action', 'test:action');
  });
});
