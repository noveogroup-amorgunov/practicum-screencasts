import Block from '../../core/Block';

export class OnboardingPage extends Block {
  render() {
    // language=hbs
    return `
    {{#Layout name="Onboarding" }}
      {{{Button text="Login"}}}
      <div>
        {{{Link text="Login" to="/login"}}}
        {{{Link text="Sign Up" to="/signup"}}}
      </div>
    {{/Layout}}
    `;
  }
}
