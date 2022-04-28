import { HashRouter } from 'core';

export class MockedHashRouter extends HashRouter {
  go(hash: string) {
    console.log('hash go to ', hash);
    window.location.hash = hash;
    this.onRouteChange();
  }
}
