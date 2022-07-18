require('babel-core/register');

import { renderDOM, registerComponent, Store, BrowseRouter } from 'core';
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
    router: BrowseRouter;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const store = new Store<AppState>(defaultState);
  const router = new BrowseRouter();

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
      renderDOM(new Page({}));
    }
  });

  /**
   * Инициализируем роутинг
   */

  router
    .use('/login', getScreenComponent(Screens.Login))
    .use('/onboarding', getScreenComponent(Screens.Onboarding))
    .use('/profile/', getScreenComponent(Screens.Profile))
    .use('/', getScreenComponent(Screens.Onboarding))
    .use('*', getScreenComponent(Screens.Login))
    .start()
/**
  url /onboarding/23/book
  pathname /onboarding/book


  
 *  */ 
  
  /**
   * Загружаем данные для приложения
   */
  setTimeout(() => {
    store.dispatch(initApp);
  }, 100);
});
