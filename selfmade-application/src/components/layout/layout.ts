import { Block, HashRouter } from 'core';
import { withRouter, withStore, withIsLoading } from 'utils';

import './layout.css';

interface LayoutProps {
  showBack?: boolean;
  router?: HashRouter;
  isLoading?: boolean;
  fullScreen?: boolean;
  onBack?: (e: MouseEvent) => void;
}

class Layout extends Block<LayoutProps> {
  constructor(props: LayoutProps) {
    super(props);

    this.setProps({
      onBack: (e: MouseEvent) => {
        e.preventDefault();
        this.props.router?.back();
      },
    })
  }

  protected render(): string {
    // language=hbs
    return `
      <div class="screen {{#if fullScreen}}screen_theme_full{{/if}}">
        {{#if isLoading}}
          <div class="screen__loader">
            <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
          </div>
        {{/if}}
        <div class="screen__header">
          <div class="screen__title">
            {{title}}
          </div>
        </div>
        {{#if showBack}}
          <div class="screen__back">{{{Link text="←" onClick=onBack}}}</div>
        {{/if}}
        <div class="screen__content" data-layout=1></div>
      </div>
    `;
  }
}
const ConnectedLayout = withRouter(withIsLoading(Layout));

export { ConnectedLayout as Layout };
