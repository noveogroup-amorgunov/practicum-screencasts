import OnboardingPage from 'pages/onboarding';
import LoginPage from 'pages/login';
import ProfilePage from 'pages/profile';
import { Block } from 'core';

export enum Screens {
  Onboarding = 'onboadring',
  Login = 'login',
  Profile = 'profile',
}

const map: Record<Screens, typeof Block> = {
  [Screens.Onboarding]: OnboardingPage,
  [Screens.Login]: LoginPage,
  [Screens.Profile]: ProfilePage,
};

export const getScreenComponent = (screen: Screens): typeof Block => {
  return map[screen];
};
