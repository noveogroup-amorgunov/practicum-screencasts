import { BlockClass } from 'core';

type WithUserProps = { user: User | null };

export function withUser<P extends WithUserProps>(WrappedBlock: BlockClass<P>) {
  // @ts-expect-error No base constructor has the specified
  return class extends WrappedBlock<P> {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({ ...props, user: window.store.getState().user });
    }

    __onChangeUserCallback = (prevState: AppState, nextState: AppState) => {
      if (JSON.stringify(prevState.user) !== JSON.stringify(nextState.user)) {
        // @ts-expect-error this is not typed
        this.setProps({ ...this.props, user: nextState.user });
      }
    }

    componentDidMount(props: P) {
      super.componentDidMount(props);
      window.store.on('changed', this.__onChangeUserCallback);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      window.store.off('changed', this.__onChangeUserCallback);
    }

  } as BlockClass<Omit<P, 'user'>>;
}
