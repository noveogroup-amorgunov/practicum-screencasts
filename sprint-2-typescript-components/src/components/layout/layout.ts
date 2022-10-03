import Block from '../../core/Block';

import './layout.css';

export interface LayoutProps {}

export class Layout extends Block<LayoutProps> {
  protected render(): string {
    // language=hbs
    return `
      <div class="screen screen_theme_full">
        <div class="screen__header">
          <div class="screen__title">
            {{title}}
          </div>
        </div>
        <div class="screen__content" data-slot="1"></div>
      </div>
    `
  }
}
