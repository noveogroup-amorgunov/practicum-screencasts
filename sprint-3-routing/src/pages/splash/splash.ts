import { Block } from 'core';

type SplashPageProps = {};

export class SplashPage extends Block<SplashPageProps> {
  static componentName = 'SplashPage';
  
  render() {
    return `
    {{#Layout name="Splash screen" fullScreen=true splash=true}}
      {{{Logo}}}
    {{/Layout}}
    `;
  }
}

export default SplashPage;
