import Block from '../../core/Block';

type OnboardingPageProps = {
  links: Array<{text: string; to: string}>
}

export class OnboardingPage extends Block {
  constructor({links}: OnboardingPageProps) {
    super({links});
  }

  render() {
    // language=hbs
    return `
    {{#Layout name="Onboarding" }}
      {{{Button text="Login"}}}
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
