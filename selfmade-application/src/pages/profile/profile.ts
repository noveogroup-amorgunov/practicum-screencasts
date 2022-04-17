import Block from 'core/Block';
import { withStore, withRouter, withUser } from 'utils';
import { logout } from 'services/auth';
import { HashRouter, Store } from 'core';

import "./profile.css";

type ProfilePageProps = {
  router: HashRouter;
  store: Store<AppState>;
  onLogout?: () => void;
  user: () => User;
  screenTitle?: () => string | undefined;
};

export class ProfilePage extends Block<ProfilePageProps> {
  constructor(props: ProfilePageProps) {
    super(props);

    this.setProps({
      onLogout: () => this.props.store.dispatch(logout),
      screenTitle: () =>
        `Hello, ${this.props.user().firstName} 👋`,
    });
  }

  componentDidMount() {
    if (!this.props.user()) {
      this.props.router.go('#onboarding');
    }
  }

  render() {
    const user = this.props.user();

    if (!user) {
      return `
      {{#Layout name="Profile" title=screenTitle fullScreen=true}}
        <div class="chats-screen">
          no user
        </div>
      {{/Layout}}
      `
    }

    return `
    {{#Layout name="Profile" title=screenTitle fullScreen=true showBack=true}}
      <div class="profile-screen">
        <div class="profile-screen__header user-profile">
          <div class="user-profile__avatar" style="background-image: url(${process.env.API_ENDPOINT}/resources/${user?.avatar})"></div>
          <div class="user-profile__name">
            ${user.displayName || user.firstName}
          </div>
        </div>
        <div class="profile-screen__content">
          <div class="profile-screen__title">
            Account Info
          </div>
          <div class="profile-screen__info-wrapper">
            <div class="profile-screen__info">
              <div class="profile-screen__label">
                Phone number
              </div>
              <div class="profile-screen__value">
                ${user.phone}
              </div>
            </div>
            <div class="profile-screen__info">
              <div class="profile-screen__label">
                Username
              </div>
              <div class="profile-screen__value">
                @${user.login}
              </div>
            </div>
          </div>
          {{{Button text="Logout" onClick=onLogout}}}
        </div>
      </div>
    {{/Layout}}
    `;
  }
}

export default withRouter(withStore(withUser(ProfilePage)));
