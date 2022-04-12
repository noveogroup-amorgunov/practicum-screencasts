require('babel-core/register');

import { renderDOM, registerComponent, HashRouter, Store } from 'core';
import { initApp } from './services/initApp';
import { diffObjectsDeep, getScreenComponent, Screens } from './utils';
import { defaultState } from './store';

import './app.css';

import * as components from './components';

Object.values(components).forEach((Component: any) => {
  registerComponent(Component);
});

declare global {
  interface Window {
    store: Store<AppState>;
    router: HashRouter;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const store = new Store<AppState>(defaultState);
  const router = new HashRouter();

  /**
   * Помещаем роутер и стор в глобальную область для доступа в хоках with*
   * @warning Не использовать такой способ на реальный проектах
   */
  window.router = router;
  window.store = store;

  /**
   * Глобальный слушатель изменений в сторе
   * для переключения активного экрана
   */
  store.on('changed', (prevState, nextState) => {
    if (process.env.DEBUG) {
      console.log(
        '%cstore updated',
        'background: #222; color: #bada55',
        nextState,
      );
      console.log(JSON.stringify(diffObjectsDeep.map(prevState, nextState)));
    }

    if (prevState.screen !== nextState.screen) {
      const Page = getScreenComponent(nextState.screen);
      renderDOM(new Page());
    }
  });

  /**
   * Инициализируем роутинг
   */
  router
    .use('#login', () => store.dispatch({ screen: Screens.Login }))
    .use('#onboarding', () => store.dispatch({ screen: Screens.Onboarding }))
    .use('#profile', () => store.dispatch({ screen: Screens.Profile }))
    .use('#', () => store.dispatch({ screen: Screens.Onboarding }))
    .onRouteChange();

  /**
   * Загружаем данные для приложения
   */
  setTimeout(() => {
    store.dispatch(initApp);
  }, 100);
});
