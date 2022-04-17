import Block from 'core/Block';
import { withStore, withRouter } from 'utils';
import { logout } from 'services/auth';
import { HashRouter, Store } from 'core';

type ProfilePageProps = {
  router: HashRouter;
  store: Store<AppState>;
  onLogout?: () => void;
  userLogin?: () => string | undefined;
  userName?: () => string | undefined;
  screenTitle?: () => string | undefined;
};

export class ProfilePage extends Block<ProfilePageProps> {
  constructor(props: ProfilePageProps) {
    super(props);

    this.setProps({
      onLogout: () => this.props.store.dispatch(logout),
      userLogin: () => this.props.store.getState().user?.login,
      userName: () => this.props.store.getState().user?.firstName,
      screenTitle: () =>
        `Hello, ${this.props.store.getState().user?.firstName} 👋`,
    });
  }

  componentDidMount() {
    if (!this.props.store.getState().user) {
      this.props.router.go('#onboarding');
    }
  }

  render() {
    return `
    {{#Layout name="Profile" title=screenTitle}}
      {{{Button text="Logout" onClick=onLogout}}}
      <div>
        login: {{userLogin}}<br />
        first_name: {{userName}}
      </div>
    {{/Layout}}
    `;
  }
}

export default withRouter(withStore(ProfilePage));
