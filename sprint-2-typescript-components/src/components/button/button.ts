import Block from '../../core/Block';
import template from 'bundle-text:./template.hbs';

import './button.css';

interface ButtonProps {
  text: string;
  onClick: () => void;
}

export class Button extends Block {
  constructor({text, onClick}: ButtonProps) {
    super({text, events: {click: onClick}});
  }

  protected render(): string {
    return template;
  }
}
