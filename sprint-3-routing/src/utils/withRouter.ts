import { BlockClass } from 'core';
import { HashRouter } from 'core/HashRouter';

type WithRouterProps = { router: HashRouter }

export function withRouter<P extends WithRouterProps>(WrappedBlock: BlockClass<P>) {
  // @ts-expect-error No base constructor has the specified number of type arguments
  return class extends WrappedBlock<P> {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({ ...props, router: window.router });
    }
  } as BlockClass<Omit<P, 'router'>>;
}
