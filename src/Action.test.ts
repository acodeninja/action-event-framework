import {beforeAll, describe, expect, jest, test} from "@jest/globals";
import {EventEmitter} from "events";
import {Action} from "./Action";
import {Event} from "./Event";

class TestSucceeded extends Event {

}

class TestAction extends Action {
  successEvents = [TestSucceeded];
  async implementation(): Promise<void> {

  }
}

class TestFailed extends Event {

}

class FailingTestAction extends Action {
  failureEvents = [TestFailed];
  async implementation(): Promise<void> {
    throw new Error('failed');
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
  const emitter = new EventEmitter();

  action.implementation = jest.fn(action.implementation);

  beforeAll(async () => {
    await action.execute(emitter);
  });

  test('the action implementation has been called', () => {
    expect(action.implementation).toHaveBeenCalled();
  });

  describe('when the action executes successfully', () => {
    const payload = {test: 'test'};
    const action = TestAction.create(payload);
    const emitter = new EventEmitter();

    emitter.emit = jest.fn(emitter.emit);

    beforeAll(async () => {
      await action.execute(emitter);
    });

    test('the success events are emitted', () => {
      expect(emitter.emit).toHaveBeenCalledWith('test:succeeded', {

      });
    });
  });

  describe('when the action executes unsuccessfully', () => {
    const payload = {test: 'test'};
    const action = FailingTestAction.create(payload);
    const emitter = new EventEmitter();

    emitter.emit = jest.fn(emitter.emit);

    beforeAll(async () => {
      await action.execute(emitter);
    });

    test('the failure events are emitted', () => {
      expect(emitter.emit).toHaveBeenCalledWith('test:failed', {
        error: new Error('failed'),
      });
    });
  });

});
