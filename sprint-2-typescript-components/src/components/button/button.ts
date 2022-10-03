import Block from '../../core/Block';
import template from 'bundle-text:./template.hbs';

import './button.css';

export type IncomingProps = {
  text: string;
  onClick: () => void;
}

export type Props = {
  text: string;
  events: {
    click: () => void;
  }
}

export class Button extends Block<Props> {
  constructor({text, onClick}: IncomingProps) {
    super({text, events: {click: onClick}});
  }

  protected render(): string {
    return template;
  }
}
