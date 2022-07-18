import Block from '../../core/Block';

import './button.css';

interface ButtonProps {
  text: string;
  onClick: () => void;
}

export class Button extends Block {
  constructor({ text, onClick }: ButtonProps) {
    super({ text, events: { click: onClick } });
  }

  protected render(): string {
    // language=hbs
    return `
      <div class="button">
        <button class="button__button" type="button">{{text}}</button>
      </div>
    `;
  }
}
