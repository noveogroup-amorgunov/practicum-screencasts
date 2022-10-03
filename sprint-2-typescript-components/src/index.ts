require("babel-core/register");

import { renderDOM, registerComponent }  from './core';

import OnboardingPage from './pages/onboarding';
import LoginPage from './pages/login';

import './app.css';

import Button, { ButtonProps, IncomingButtonProps } from './components/button';
import Link from './components/link';
import Input from './components/input';
import Layout from './components/layout';

registerComponent(Button);
registerComponent(Link);
registerComponent(Input);
registerComponent(Layout);

let currentPage = 'onboarding'
const pagesMap = {
  onboarding: OnboardingPage,
}

document.addEventListener("DOMContentLoaded", () => {
  // DEV: Расскоментировать нужно страницу для отображения

  // const App = new LoginPage();
  const App = new OnboardingPage({
    links: [
      {to: '#signup', text: 'signup'},
      {to: '#login', text: 'login'},
    ]
  });

  renderDOM(App);
});
