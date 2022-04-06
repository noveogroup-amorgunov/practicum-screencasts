require("babel-core/register");

import { Block, renderPage, registerComponent }  from './core';

import OnboardingPage from './pages/onboarding';
import LoginPage from './pages/login';

import './app.css';

import Button from './components/button';
import Link from './components/link';
import Input from './components/input';
import Layout from './components/layout';

registerComponent(Button);
registerComponent(Link);
registerComponent(Input);
registerComponent(Layout);

document.addEventListener("DOMContentLoaded", () => {
  renderPage(LoginPage);
  // renderPage(OnboardingPage);
});
