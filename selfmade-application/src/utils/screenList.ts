import OnboardingPage from 'pages/onboarding';
import LoginPage from 'pages/login';
import ProfilePage from 'pages/profile';
import ChatsPage from 'pages/chats';
import MessangerPage from 'pages/messanger';
import { Block, BlockClass } from 'core';

export enum Screens {
  Onboarding = 'onboadring',
  Login = 'login',
  Profile = 'profile',
  Chats = 'chats',
  Messanger = 'messanger',
}

const map: Record<Screens, BlockClass<{}>> = {
  [Screens.Onboarding]: OnboardingPage,
  [Screens.Login]: LoginPage,
  [Screens.Profile]: ProfilePage,
  [Screens.Chats]: ChatsPage,
  [Screens.Messanger]: MessangerPage,
};

export const getScreenComponent = (screen: Screens): BlockClass => {
  return map[screen];
};
