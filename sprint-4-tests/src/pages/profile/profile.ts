import Block from 'core/Block';
import { withUser, withStore, withRouter } from 'utils';
import { logout } from 'services/auth';
import { HashRouter, Store } from 'core';

import './styles.css';

type ProfilePageProps = {
  router: HashRouter;
  store: Store<AppState>;
  user: User | null;
  onLogout?: () => void;
};

export class ProfilePage extends Block<ProfilePageProps> {
  static componentName = 'ProfilePage';

  constructor(props: ProfilePageProps) {
    super(props);

    this.setProps({
      onLogout: () => this.props.store.dispatch(logout),
    });
  }

  componentDidUpdate() {
    if (window.store.getState().screen !== 'profile') {
      return false;
    }

    return true;
  }

  render() {
    console.log('%c Profile block render', 'background: #1f9af3; color: #fff')
  
    if (!this.props.user) {
      return `
        {{#Layout name="Profile" fullScreen=true}}
          no authorized user
        {{/Layout}}
      `
    }

    return `
    {{#Layout name="Profile" fullScreen=true}}
      <div class="profile-screen">
        <div class="profile-screen__header user-profile">
          <div class="user-profile__avatar" style="background-image: url(${process.env.API_ENDPOINT}/resources/{{user.avatar}})"></div>
          <div class="user-profile__name">
            {{user.firstName}} {{user.secondName}}
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
                {{user.phone}}
              </div>
            </div>
            <div class="profile-screen__info">
              <div class="profile-screen__label">
                Username
              </div>
              <div class="profile-screen__value">
                @{{user.login}}
              </div>
            </div>
            <div class="profile-screen__info">
              <div class="profile-screen__label">
                Email
              </div>
              <div class="profile-screen__value">
                {{user.email}}
              </div>
            </div>
          </div>
          {{{Button dataTestId="logout-btn" text="Logout" onClick=onLogout}}}
        </div>
      </div>
    {{/Layout}}
    `;
  }
}

export default withRouter(withStore(withUser(ProfilePage)));
