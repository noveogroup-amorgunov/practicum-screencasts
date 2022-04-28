import OnboardingPage from 'pages/onboarding';
import LoginPage from 'pages/login';
import ProfilePage from 'pages/profile';
import { BlockClass } from 'core';

export enum Screens {
  Onboarding = 'onboarding',
  Login = 'login',
  Profile = 'profile',
}

const map: Record<Screens, BlockClass<any>> = {
  [Screens.Onboarding]: OnboardingPage,
  [Screens.Login]: LoginPage,
  [Screens.Profile]: ProfilePage,
};

export const getScreenComponent = (screen: Screens): BlockClass<any> => {
  return map[screen];
};
