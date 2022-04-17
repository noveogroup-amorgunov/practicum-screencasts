import { BlockClass } from 'core';

type WithUserProps<P> = P & { user: () => User }

/**
 * HOC не подписан на изменения стора, поэтому будет корректно работать
 * только при обернутом withStore хоке.
 */
export function withUser<P>(Component: BlockClass<P>) {
  // @ts-expect-error No base constructor has the specified number of type arguments
  return class extends Component<WithUserProps<P>> {
    public static componentName = Component.componentName || Component.name;

    constructor(props: WithUserProps<P>) {
      super({ ...props, user: () => window.store.getState().user });
    }
  } as BlockClass<P>;
}
