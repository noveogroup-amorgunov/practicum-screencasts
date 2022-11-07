import { BlockClass, Store } from 'core';

type WithStateProps = { store: Store<AppState> };

type MapStateToProps<S> = (state: AppState) => S

// withStore(Page, (state) => {
//   isLoding: state.isLoading
// })

export function withStore<P extends WithStateProps, S = any>(WrappedBlock: BlockClass<P>, mapStateToProps: MapStateToProps<S>) {
  // @ts-expect-error No base constructor has the specified
  return class extends WrappedBlock<P> {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      // TODO: прокидывать свойства через mapStateToProps
      super({ ...props, store: window.store });
    }

    __onChangeStoreCallback = (prev: AppState, next: AppState) => {
      if (typeof mapStateToProps === 'function') {
        const prevPropFromState = mapStateToProps(prev);
        const nextPropFromState = mapStateToProps(next);

        if (JSON.stringify(prevPropFromState) === JSON.stringify(nextPropFromState)) {
          return
        }

        this.setProps(nextPropFromState)
        return
      }

      /**
       * TODO: проверить что стор реально обновлен
       * и прокидывать не целый стор, а необходимые поля
       * с помощью метода mapStateToProps
       */
      // @ts-expect-error this is not typed
      this.setProps({ ...this.props, store: window.store });
    }

    componentDidMount(props: P) {
      super.componentDidMount(props);
      window.store.on('changed', this.__onChangeStoreCallback);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      window.store.off('changed', this.__onChangeStoreCallback);
    }

  } as BlockClass<Omit<P, 'store'>>;
}
