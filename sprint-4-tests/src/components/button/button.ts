import Block from '../../core/Block';

import './button.css';

interface ButtonProps {
  text: string;
  onClick: () => void;
  dataTestId?: string;
}

export class Button extends Block {
  static componentName = 'Button';

  constructor({ text, onClick, dataTestId }: ButtonProps) {
    super({ text, dataTestId, events: { click: onClick } });
  }

  protected render(): string {
    // language=hbs
    return `
      <div class="button">
        <button {{#if dataTestId}}data-testid="{{dataTestId}}"{{/if}} class="button__button" type="button">{{text}}</button>
      </div>
    `;
  }
}
