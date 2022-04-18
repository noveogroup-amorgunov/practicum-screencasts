import { withStore, withRouter, withIsLoading } from 'utils';
import { HashRouter, Store, Block } from 'core';

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
    return `
    {{#Layout name="Onboarding" fullScreen=true}}
      {{{Button text="Enter" onClick=onNavigateNext}}}
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

export default withRouter(withStore(withIsLoading(OnboardingPage)));
