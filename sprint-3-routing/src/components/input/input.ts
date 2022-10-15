import Block from '../../core/Block';

import './input.css';

interface InputProps {
  onChange?: () => void;
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  label?: string;
  value?: string;
  error?: string;
}

export class Input extends Block {
  static componentName = 'Input';

  constructor({
    onChange = () => {},
    type = 'text',
    error,
    placeholder,
    value,
    label,
  }: InputProps) {
    super({ type, placeholder, value, error, label, events: { input: onChange } });
  }

  protected render(): string {
    // language=hbs
    return `
      <div class="input">
        <input class="input__input" type="{{type}}" placeholder="{{placeholder}}" value="{{value}}">
        {{#if label}}<div class="input__label">{{label}}</div>{{/if}}
        <div class="input__error">{{#if error}}{{error}}{{/if}}</div>
      </div>
    `;
  }
}
