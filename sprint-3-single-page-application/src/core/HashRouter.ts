/**
 * @warning в работах нужно реализовать обычный Router.
 */
export class HashRouter {
  routes: Record<string, Function> = {};

  constructor() {
    window.addEventListener('hashchange', () => this.onRouteChange());
  }

  onRouteChange() {
    const { hash } = window.location;

    Object.entries(this.routes).some(([routeHash, callback]) => {
      if (routeHash === hash) {
        callback();
        return true;
      }
      return false;
    });
  }

  use(hash: string, callback: Function) {
    this.routes[hash] = callback;
    return this;
  }

  go(hash: string) {
    window.location.hash = hash;
  }

  back() {
    window.history.back();
  }
}
