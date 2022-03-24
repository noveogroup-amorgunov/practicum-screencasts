import Block from '../../core/Block';

export class LoginPage extends Block {
  protected getStateFromProps() {
    this.state = {
      values: {
        login: '',
        password: '',
      },
      errors: {
        login: '',
        password: '',
      },
      onLogin: () => {
        const loginData = {
          login: (this.refs.login.firstElementChild as HTMLInputElement).value,
          password: (this.refs.password.firstElementChild as HTMLInputElement).value
        };

        const nextState = {
          errors: {
            login: '',
            password: '',
          },
          values: { ...loginData },
        };

        if (!loginData.login) {
          nextState.errors.login = 'Login is required';
        } else if (loginData.login.length < 4) {
          nextState.errors.login = 'Login should contain more than 3 chars';
        }

        if (!loginData.password) {
          nextState.errors.password = 'Password is required';
        }

        this.setState(nextState);

        console.log('action/login', loginData);
      }
    }
  }

  render() {
    const { errors, values } = this.state;

    // language=hbs
    return `
    <div class="screen screen_theme_full">
      <div class="screen__header">
        <div class="screen__title">
          Login
        </div>
      </div>
      <div class="screen__content">
        <form class="login-form form">

          {{{Input
            value="${values.login}"
            error="${errors.login}"
            ref="login"
            id="login"
            type="text"
            placeholder="Login"
          }}}

          {{{Input
            value="${values.password}"
            error="${errors.password}"
            ref="password"
            id="password" 
            type="password"
            placeholder="Password"
          }}}

          {{{Button
            text="Login"
            onClick=onLogin
          }}}
        </form>
      </div>
    </div>
    `;
  }
}
