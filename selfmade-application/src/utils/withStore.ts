import { Block, BlockClass, Store } from 'core';

type WithStateProps<P> = P & { store: Store<AppState> }

export function withStore<P>(Component: BlockClass<P>): BlockClass<P> {
  // @ts-expect-error No base constructor has the specified number of type arguments
  return class extends Component<WithStateProps<P>> {
    public static componentName = Component.componentName || Component.name;

    constructor(props: WithStateProps<P>) {
      super({ ...props, store: window.store });
    }

    __onChangeStoreCallback = () => {
      /**
       * TODO: проверить что стор реально обновлен
       * и прокидывать не целый стор, а необходимые поля
       * с помощью метода mapStateToProps
       */
      this.setProps({
        ...this.props,
        store: window.store,
      });
    }

    componentDidMount(props: WithStateProps<P>) {
      super.componentDidMount(props);
      window.store.on('changed', this.__onChangeStoreCallback);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      window.store.off('changed', this.__onChangeStoreCallback);
    }
  } as BlockClass<P>;
}
