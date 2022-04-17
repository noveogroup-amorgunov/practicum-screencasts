import Block from '../../core/Block';

import './link.css';

interface LinkProps {
  text: string;
  to: string;
  onClick?: string;
}

export class Link extends Block {
  constructor(props: LinkProps) {
    super({ ...props, events: { click: props.onClick } });
  }

  render() {
    // language=hbs
    return `<a href="{{to}}">{{text}}</a>`;
  }
}
