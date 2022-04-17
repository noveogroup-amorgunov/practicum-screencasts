import { withStore, withRouter } from 'utils';
import { HashRouter, Store, Block } from 'core';

type OnboardingPageProps = {
  router: HashRouter;
  store: Store<AppState>;
  isLoading?: () => void;
  onToggleAppLoading?: () => void;
  navigateToLogin?: () => void;
};

export class OnboardingPage extends Block<OnboardingPageProps> {
  constructor(props: OnboardingPageProps) {
    super(props);

    this.setProps({
      isLoading: () => Boolean(this.props.store.getState().isLoading),
      onToggleAppLoading: () => this.onToggleAppLoading(),
      navigateToLogin: () => this.props.router.go('#login'),
    });
  }

  onToggleAppLoading() {
    this.props.store.dispatch({ isLoading: true });

    setTimeout(() => {
      this.props.store.dispatch({ isLoading: false });
    }, 2000);
  }

  componentDidMount() {
    if (this.props.store.getState().user) {
      this.props.router.go('#profile');
    }
  }

  render() {
    return `
    {{#Layout name="Onboarding" fullScreen=true isLoading=isLoading}}
      {{{Button text="Login" onClick=navigateToLogin}}}
      <div>
        {{#each links}}
          {{#with this}}
            {{{Link text="{{text}}" to="{{to}}"}}}
          {{/with}}
        {{/each}}
      </div>
      {{{Button text="Toggle app loading" onClick=onToggleAppLoading}}}
      <div>
        isLoading: {{isLoading}}
      </div>
    {{/Layout}}
    `;
  }
}

export default withRouter(withStore(OnboardingPage));
