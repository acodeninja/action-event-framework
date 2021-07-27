import {beforeAll, describe, expect, jest, test} from "@jest/globals";
import {Action} from "./Action";

class TestAction extends Action {
  async implementation(): Promise<void> {

  }
}

describe('creating an Action instance', () => {
  const payload = {test: 'test'};
  const action = TestAction.create(payload);

  test('has an appropriate action name', () => {
    expect(action).toHaveProperty('action', 'test:action');
  });

  test('has the input payload', () => {
    expect(action).toHaveProperty('payload', payload);
  });
});

describe('executing an Action', () => {
  const payload = {test: 'test'};
  const action = TestAction.create(payload);

  action.implementation = jest.fn(action.implementation);

  beforeAll(async () => {
    await action.execute();
  });

  test('the action implementation has been called', () => {
    expect(action.implementation).toHaveBeenCalled();
  });
});
