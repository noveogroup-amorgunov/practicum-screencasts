require("babel-core/register");

import { Block, renderPage, registerComponent }  from './core';

import OnboardingPage from './pages/onboarding';
import LoginPage from './pages/login';

import './app.css';

const components = require('./components/**/index.ts') as {[key: string]: { default: typeof Block }};

Object.values(components).forEach((component) => {
  registerComponent(component.default);
});

document.addEventListener("DOMContentLoaded", () => {
  renderPage(LoginPage);
  // renderPage(OnboardingPage);
});
