import { HashRouter } from 'core';

export class MockedHashRouter extends HashRouter {
  go(hash: string) {
    window.location.hash = hash;
    this.onRouteChange();
  }
}
