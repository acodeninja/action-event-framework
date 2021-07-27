import {describe, expect, test} from "@jest/globals";
import {Action} from "./Action";

class TestAction extends Action {

}

describe('a newly instantiated Action', () => {
  const payload = {test: 'test'};
  const event = TestAction.create(payload);

  test('has an appropriate event name', () => {
    expect(event).toHaveProperty('action', 'test:action');
  });

  test('has the input payload', () => {
    expect(event).toHaveProperty('payload', payload);
  });
});
