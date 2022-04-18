import { Block } from 'core';

import './logo.css';

interface LogoProps {
  black?: boolean;
  onClick?: string;
}

export class Logo extends Block {
  static componentName = 'Logo';

  constructor(props: LogoProps) {
    super({ ...props, events: { click: props.onClick } });
  }

  render() {
    // language=hbs
    return `
      <div class="logo{{#if black}} logo_type_black{{/if}}">
        <div class="logo__top"></div>
        <div class="logo__left"></div>
        <div class="logo__right"></div>
      </div>
    `;
  }
}
