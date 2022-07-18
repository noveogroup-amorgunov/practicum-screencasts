import { Block } from 'core';

import './error.css';

interface ErrorProps {
  value?: string;
}

export class Error extends Block {
  constructor(props: ErrorProps) {
    super(props);
  }

  protected render(): string {
    // language=hbs
    return `
      <div class="error">{{#if value}}{{value}}{{/if}}</div>
    `;
  }
}
