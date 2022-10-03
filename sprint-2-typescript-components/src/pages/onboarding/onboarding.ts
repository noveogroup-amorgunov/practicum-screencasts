import Button from '../../components/button';
import Layout, { LayoutProps } from '../../components/layout';
import Block from '../../core/Block';

type IncomingProps = {
  links: Array<{text: string; to: string}>
}

type Props = IncomingProps & {
  onClick: () => void;
}

type Refs = {
  buttonRef: Button
}

export class OnboardingPage extends Block<Props, Refs> {
  constructor({links}: IncomingProps) {
    super({
      links,
      onClick: () => {
        const nextValue = String(Number(this.refs.buttonRef.getProps().text) + 1)
        this.refs.buttonRef.setProps({ text: nextValue });
      },
    });
  }

  // handleLogin() {
  //   this.props.disabled
  // }

  render() {
    // language=hbs
    return `
    {{#Layout name="Onboarding" }}
      {{{Button onClick=onClick ref="buttonRef" text="1"}}}
      <div>
        {{#each links}}
          {{#with this}}
            {{{Link text="{{text}}" to="{{to}}"}}}
          {{/with}}
        {{/each}}
      </div>
    {{/Layout}}
    `;
  }
}

