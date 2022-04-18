import { Block } from 'core';

type SplashPageProps = {};

export class SplashPage extends Block<SplashPageProps> {
  render() {
    return `
    {{#Layout name="Splash screen" fullScreen=true splash=true}}
      <div></div>
    {{/Layout}}
    `;
  }
}

export default SplashPage;
