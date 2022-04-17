import { BlockClass, Block } from 'core';
import { HashRouter } from 'core/HashRouter';

type WithRouterProps<P> = P & { router: HashRouter }

export function withRouter<P>(Component: BlockClass<P>): BlockClass<P> {
  // @ts-expect-error No base constructor has the specified number of type arguments
  return class extends Component<WithRouterProps<P>> {
    public static componentName = Component.componentName || Component.name;

    constructor(props: WithRouterProps<P>) {
      super({ ...props, router: window.router });
    }
  } as BlockClass<P>;
}
