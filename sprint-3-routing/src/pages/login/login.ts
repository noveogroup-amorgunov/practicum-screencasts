import { withStore, withRouter } from 'utils';
import { login } from 'services/auth';
import { CoreRouter, Store, Block } from 'core';

type LoginPageProps = {
  router: CoreRouter;
  store: Store<AppState>;
  formError?: () => string | null;
};

export class LoginPage extends Block<LoginPageProps> {
  static componentName = 'LoginPage';

  constructor(props: LoginPageProps) {
    super(props);

    this.setProps({
      formError: () => this.props.store.getState().loginFormError,
    });
  }

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
        // TODO: вынести в отдельный метод

        let hasError = false;
        const loginData = {
          login: (this.refs.login.firstElementChild as HTMLInputElement).value,
          password: (this.refs.password.firstElementChild as HTMLInputElement)
            .value,
        };

        const nextState = {
          errors: {
            login: '',
            password: '',
          },
          values: { ...loginData },
        };

        if (!loginData.login) {
          hasError = true;
          nextState.errors.login = 'Login is required';
        } else if (loginData.login.length < 4) {
          hasError = true;
          nextState.errors.login = 'Login should contain more than 3 chars';
        }

        if (!loginData.password) {
          hasError = true;
          nextState.errors.password = 'Password is required';
        }

        this.setState(nextState);

        if (!hasError) {
          this.props.store.dispatch(login, loginData);
        }
      },
    };
  }

  render() {
    const { errors, values } = this.state;

    // language=hbs
    return `
    {{#Layout name="Login" fullScreen=true}}
      <form class="login-form form">

        {{{Input
          value="${values.login}"
          error="${errors.login}"
          ref="login"
          id="login"
          type="text"
          placeholder="awesome@mail.com"
          label="Login"
        }}}

        {{{Input
          value="${values.password}"
          error="${errors.password}"
          ref="password"
          id="password" 
          type="password"
          placeholder="Password"
          label="Password"
        }}}

        {{{Button
          text="Login"
          onClick=onLogin
        }}}
        {{{Error value=formError}}}
      </form>
    {{/Layout}}
    `;
  }
}

export default withRouter(withStore(LoginPage));
