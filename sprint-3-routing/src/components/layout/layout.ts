import { Block } from 'core';
import { withIsLoading } from 'utils';

import './layout.css';

interface LayoutProps {
  isLoading: boolean;
  fullScreen?: boolean;
}

class Layout extends Block<LayoutProps> {
  protected render(): string {
    // language=hbs
    return `
      <div class="screen {{#if fullScreen}}screen_theme_full{{/if}} {{#if isLoading}}screen_loading{{/if}}">
        <div class="screen__header">
          <div class="screen__title">
            {{title}}
          </div>
        </div>
        <div class="screen__content" data-layout=1></div>
      </div>
    `;
  }
}

const ComposedLayout = withIsLoading(Layout);

export { ComposedLayout as Layout };
