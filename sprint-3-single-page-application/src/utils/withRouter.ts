import { Block } from 'core';
import { HashRouter } from 'core/HashRouter';

export function withRouter<T>(Component: typeof Block) {
  return class WithRouter extends Component<T> {
    public static componentName = Component.name;

    constructor(props: T & { router: HashRouter }) {
      super({ ...props, router: window.router });
    }
  };
}
