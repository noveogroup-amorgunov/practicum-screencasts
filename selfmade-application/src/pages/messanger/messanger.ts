import Block from 'core/Block';
import { withStore, withRouter } from 'utils';
import { HashRouter, Store } from 'core';

import './messanger.css';

type MessangerPageProps = {
  router: HashRouter;
  store: Store<AppState>;
};

export class MessangerPage extends Block<MessangerPageProps> {
  constructor(props: MessangerPageProps) {
    super(props);

    // this.setProps({});
  }

  render() {
    const user = this.props.store.getState().user;

    if (!user) {
      return `
      {{#Layout name="Chats" title=screenTitle fullScreen=true showBack=true}}
        <div class="chats-screen">
          no user
        </div>
      {{/Layout}}
      `
    }

    return `
    {{#Layout name="Messanger" title=screenTitle fullScreen=true showBack=true}}
      <div class="messanger-screen">
        <div class="messanger-screen__content">
          <div class="message">
            <div class="message__header">
              <div class="message__avatar" style="background-image: url(${process.env.API_ENDPOINT}/resources/${user?.avatar})"></div>
              <div class="message__title">Arlene McCoy</div>
              <div class="message__time">12:25</div>
            </div>
            <div class="message__content">Unless you hve the dubious living right next door to an aorport one of the biggest</div>
          </div>
          <div class="message">
            <div class="message__header">
              <div class="message__avatar" style="background-image: url(${process.env.API_ENDPOINT}/resources/${user?.avatar})"></div>
              <div class="message__title">Arlene McCoy</div>
              <div class="message__time">12:26</div>
            </div>
            <div class="message__content">I wait</div>
          </div>
          <div class="message message_my">
            <div class="message__header">
              <div class="message__avatar" style="background-image: url(${process.env.API_ENDPOINT}/resources/${user?.avatar})"></div>
              <div class="message__title">Alex Bender</div>
              <div class="message__time">13:05</div>
            </div>
            <div class="message__content">Computers have become ubiquitours in almost every. However, help i at hand in the facet of our lives.</div>
          </div>
          <div class="message message_my">
            <div class="message__header">
              <div class="message__avatar" style="background-image: url(${process.env.API_ENDPOINT}/resources/${user?.avatar})"></div>
              <div class="message__title">Alex Bender</div>
              <div class="message__time">13:06</div>
            </div>
            <div class="message__content">Party Jokes Starting But Unnecessary</div>
          </div>
        </div>
        <div class="chats-screen__bar">
          bottom bar
        </div>
      </div>
    {{/Layout}}
    `;
  }
}

// TODO: поправить типизацию хоков
export default withRouter(withStore(MessangerPage));
