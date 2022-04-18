import { HashRouter, Store, renderDOM } from 'core';
import { getScreenComponent, Screens } from './utils';

const routes = [
  {
    path: '#onboarding',
    block: Screens.Onboarding,
    shouldAuthorized: false,
  },
  {
    path: '#login',
    block: Screens.Login,
    shouldAuthorized: false,
  },
  {
    path: '#profile',
    block: Screens.Profile,
    shouldAuthorized: true,
  },
  {
    path: '*',
    block: Screens.Onboarding,
    shouldAuthorized: false,
  },
];

export function initRouter(router: HashRouter, store: Store<AppState>) {
  routes.forEach(route => {
    router.use(route.path, () => {
      const isAuthorized = Boolean(store.getState().user);
      const currentScreen = Boolean(store.getState().screen);
      
      if (isAuthorized || !route.shouldAuthorized) {
        store.dispatch({ screen: route.block });
        return;
      }

      if (!currentScreen) {
        console.log('go to onboarding');
        store.dispatch({ screen: Screens.Onboarding });
      }
    });
  });

  /**
   * Глобальный слушатель изменений в сторе
   * для переключения активного экрана
   */
  store.on('changed', (prevState, nextState) => {
    if (!prevState.appIsInited && nextState.appIsInited) {
      router.start();
    }
    
    if (prevState.screen !== nextState.screen) {
      console.log(`change route to ${nextState.screen}`)
      const Page = getScreenComponent(nextState.screen);
      renderDOM(new Page({}));
    }
  });
}
