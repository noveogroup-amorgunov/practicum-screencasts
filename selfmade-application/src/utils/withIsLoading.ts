import { Block } from 'core';

/**
 * HOC не подписан на изменения стора, поэтому будет корректно работать
 * только при обернутом withStore хоке.
 */
export function withIsLoading<T>(Component: typeof Block) {
  return class extends Component<T> {
    public static componentName = Component.componentName || Component.name;

    constructor(props: T & { isLoading: boolean }) {
      super({ ...props, isLoading: () => window.store.getState().isLoading });
    }
  };
}
