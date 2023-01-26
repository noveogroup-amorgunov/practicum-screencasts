import { Store } from '../Store';

describe('core/Store', () => {
  // ЮНИТ-ТЕСТ на модуль
  test('should set state', () => {
    const store = new Store({});

    store.set({ userId: 123 });

    expect(store.getState()).toStrictEqual({ userId: 123 })
  });

  // ЮНИТ-ТЕСТ на тестирования события
  it('should emit event after store was update', () => {

    // 1 Arrange
    const store = new Store({ userId: -1 });
    const mock = jest.fn();
    store.on('changed', mock);

    // 2 Act
    store.set({ userId: 123 });

    // 3 Assert
    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenCalledWith({ userId: -1 }, { userId: 123 })
  });

  // ЮНИТ-ТЕСТ на тестирования вызова функции
  it ('should call callback with store and dispatch when it is function', () => {
    const store = new Store({ userId: -1 });
    const mock = jest.fn();

    store.dispatch(mock, 'PAYLOAD_PARAMS');

    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenCalledWith(expect.anything(), store.getState(), 'PAYLOAD_PARAMS')
  });
});
