import { Block, Store } from 'core';

export function withStore<T>(Component: typeof Block) {
  return class extends Component<T> {
    public static componentName = Component.name;

    constructor(props: T & { store: Store<AppState> }) {
      super({ ...props, store: window.store });
    }

    componentDidMount(props: T & { store: Store<AppState> }) {
      super.componentDidMount(props);

      // TODO: Утечка памяти, так как событие не убирается
      // после пересоздания компонента

      window.store.on('changed', () => {
        this.setProps({
          ...this.props,
          store: window.store,
        });
      });
    }
  };
}
