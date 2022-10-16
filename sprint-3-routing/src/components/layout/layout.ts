import { Block, CoreRouter } from 'core';
import { withIsLoading, withRouter } from 'utils';

import './layout.css';

interface LayoutProps {
  router: CoreRouter;
  isLoading: boolean;
  fullScreen?: boolean;
  splash?: boolean;
  onNavigateToOnboarding?: () => void;
}

class Layout extends Block<LayoutProps> {
  static componentName = 'Layout';

  constructor(props: LayoutProps) {
    super(props);

    this.setProps({
      onNavigateToOnboarding: () => this.props.router.go('/onboarding'),
    });
  }

  protected render(): string {
    // language=hbs
    return `
      <div class="screen{{#if splash}} screen_type_splash{{/if}}{{#if fullScreen}} screen_theme_full{{/if}}{{#if isLoading}} screen_loading{{/if}}">
        <div class="screen__header">
          <div class="screen__title">
            {{title}}
          </div>
        </div>
        <div class="screen__logo">
          {{{Logo onClick=onNavigateToOnboarding black=true}}}
        </div>
        <div class="screen__content" data-layout=1></div>
      </div>
    `;
  }
}

const ComposedLayout = withRouter(withIsLoading(Layout));

export { ComposedLayout as Layout };
