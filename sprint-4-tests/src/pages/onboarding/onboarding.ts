import { withStore, withRouter, withIsLoading } from 'utils';
import { HashRouter, Store, Block } from 'core';

import './styles.css';

type OnboardingPageProps = {
  router: HashRouter;
  store: Store<AppState>;
  isLoading: boolean;
  onToggleAppLoading?: () => void;
  onNavigateNext?: () => void;
  onModalOpen?: () => void;
  modalIsOpened?: boolean
};

export class OnboardingPage extends Block<OnboardingPageProps> {
  static componentName = 'OnboardingPage';

  constructor(props: OnboardingPageProps) {
    super(props);

    this.setProps({
      onToggleAppLoading: () => this.onToggleAppLoading(),
      onNavigateNext: this.onNavigateNext.bind(this),
      onModalOpen: this.onModalOpen.bind(this),
      onChildModalOpen: this.onChildModalOpen.bind(this),
    });
  }

  componentDidUpdate() {
    if (window.store.getState().screen !== 'onboarding') {
      return false;
    }

    return true;
  }

  onModalOpen() {
    this.setProps({ modalIsOpened: true })
  }

  onChildModalOpen() {
    this.setProps({ childModalIsOpened: true })
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
      <div class="onboarding-screen__content" data-testid="onboarding-screen">
        <div class="onboarding-screen__title">
          Get started
        </div>
        <div class="onboarding-screen__description">
          <p>Demo project of Practicum course «Middle frontend developer». You can use <strong>johnjoe2/johnjoe2</strong> as a test credentials.</p>
          <p>To work correctly on iOS, you need to turn it off «Prevent cross-site tracking». This is necessary to store the auth cookie on practicum domain</p>
        </div>
        {{{Button text="${user ? 'Profile': 'Login'}" onClick=onNavigateNext}}}
        {{{Button text="Toggle app loading" onClick=onToggleAppLoading}}}
        {{{Button text="Open modal" onClick=onModalOpen}}}
      </div>
      {{#Modal isOpened=modalIsOpened }}
        Base modal 123
        {{{Button text="Toggle app loading" onClick=onToggleAppLoading}}}
        {{{Button text="Open child modal" onClick=onChildModalOpen}}}
      {{/Modal}}
      {{#Modal isOpened=childModalIsOpened }}
        Child modal
      {{/Modal}}
    {{/Layout}}
    `;
  }
}

/*
// onModalOpen: this.onModalOpen.bind(this),
// onModalClose: this.onModalClose.bind(this),
// onChildModalOpen: this.onChildModalOpen.bind(this),
// onChildModalClose: this.onChildModalClose.bind(this),



*/

export default withRouter(withStore(withIsLoading(OnboardingPage)));
