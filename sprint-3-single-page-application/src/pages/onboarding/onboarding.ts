import { withStore, withRouter, withIsLoading } from 'utils';
import { HashRouter, Store, Block } from 'core';

import './styles.css';

type OnboardingPageProps = {
  router: HashRouter;
  store: Store<AppState>;
  isLoading: boolean;
  onToggleAppLoading?: () => void;
  onNavigateNext?: () => void;
};

export class OnboardingPage extends Block<OnboardingPageProps> {
  constructor(props: OnboardingPageProps) {
    super(props);

    this.setProps({
      onToggleAppLoading: () => this.onToggleAppLoading(),
      onNavigateNext: () => this.onNavigateNext(),
    });
  }

  onNavigateNext() {
    if (this.props.store.getState().user) {
      this.props.router.go('#profile');
    } else {
      this.props.router.go('#login');
    }
  }

  onToggleAppLoading() {
    this.props.store.dispatch({ isLoading: true });

    setTimeout(() => {
      this.props.store.dispatch({ isLoading: false });
    }, 2000);
  }

  render() {
    const user = this.props.store.getState().user;

    return `
    {{#Layout name="Onboarding" fullScreen=true}}
      <div class="onboarding-screen__content">
        <div class="onboarding-screen__title">
          Get started
        </div>
        <div class="onboarding-screen__description">
          <p>Demo project of Practicum course «Middle frontend developer». You can use <strong>johnjoe2/johnjoe2</strong> as a test credentials.</p>
          <p>To work correctly on iOS, you need to turn it off «Prevent cross-site tracking». This is necessary to store the auth cookie on practicum domain</p>
        </div>
        {{{Button text="${user ? 'Profile': 'Login'}" onClick=onNavigateNext}}}
        {{{Button text="Toggle app loading" onClick=onToggleAppLoading}}}
      </div>
    {{/Layout}}
    `;
  }
}

export default withRouter(withStore(withIsLoading(OnboardingPage)));
