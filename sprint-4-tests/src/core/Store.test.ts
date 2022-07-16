import { Store } from './Store';

describe('core/Store', () => {
  it('should set state', () => {
    const store = new Store({});

    store.set({ userId: 123 });

    expect(store.getState()).toEqual({ userId: 123 });
  });

  it('should emit event after store was update', () => {
    const store = new Store({ userId: -1 });
    const mock = jest.fn();
  
    store.on('changed', mock);

    store.set({ userId: 123 });

    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledWith({ userId: -1 }, { userId: 123 })
  });
});
