import Block from '../../core/Block';

export class OnboardingPage extends Block {
  render() {
    // language=hbs
    return `
    <div class="screen screen_theme_full">
      <div class="screen__header">
        <div class="screen__title">
          Onboarding
        </div>
      </div>
      <div class="screen__content">
        {{{Button text="Login"}}}
        <div>
          {{{Link text="Login" to="/login"}}}
          {{{Link text="Sign Up" to="/signup"}}}
        </div>
      </div>
    </div>
    `;
  }
}
