import Block from 'core/Block';
import { withStore, withRouter } from 'utils';
import { HashRouter, Store } from 'core';

import './chats.css';

type ChatsPageProps = {
  router: HashRouter;
  store: Store<AppState>;
};

export class ChatsPage extends Block<ChatsPageProps> {
  constructor(props: ChatsPageProps) {
    super(props);

    // this.setProps({});
  }

  render() {
    const user = this.props.store.getState().user;

    if (!user) {
      return `
      {{#Layout name="Chats" title=screenTitle fullScreen=true}}
        <div class="chats-screen">
          no user
        </div>
      {{/Layout}}
      `
    }

    return `
    {{#Layout name="Chats" title=screenTitle fullScreen=true}}
      <div class="chats-screen">
        <div class="chats-screen__header user">
          <div class="user__avatar" style="background-image: url(${process.env.API_ENDPOINT}/resources/${user?.avatar})"></div>
          <div class="user__name-wrapper">
            <div class="user__greeting">Good morging</div>
            <div class="user__name">${user.displayName || user.firstName}</div>
          </div>
          <div class="user__actions">+</div>
        </div>
        <div class="chats-screen__content">
          <div class="chats-screen__title">
            <div>Chats</div>
            {{{Icon type=123 }}}
          </div>
          <div class="chats-screen__chats">
            <div class="chat-preview">
              <div class="chat-preview__avatar" style="background-image: url(${process.env.API_ENDPOINT}/resources/${user?.avatar})"></div>
              <div class="chat-preview__content">
                <div class="chat-preview__title">Design team</div>
                <div class="chat-preview__message">Awesome</div>
              </div>
              <div class="chat-preview__date">Today, 12:25</div>
            </div>
            <div class="chat-preview">
              <div class="chat-preview__avatar" style="background-image: url(${process.env.API_ENDPOINT}/resources/${user?.avatar})"></div>
              <div class="chat-preview__content">
                <div class="chat-preview__title">Daily planning</div>
                <div class="chat-preview__message">OK!</div>
              </div>
              <div class="chat-preview__date">February, 2019</div>
            </div>

            <div class="chat-preview">
              <div class="chat-preview__avatar" style="background-image: url(${process.env.API_ENDPOINT}/resources/${user?.avatar})"></div>
              <div class="chat-preview__content">
                <div class="chat-preview__title">Daily planning</div>
                <div class="chat-preview__message">OK!</div>
              </div>
              <div class="chat-preview__date">February, 2019</div>
            </div>
            <div class="chat-preview">
              <div class="chat-preview__avatar" style="background-image: url(${process.env.API_ENDPOINT}/resources/${user?.avatar})"></div>
              <div class="chat-preview__content">
                <div class="chat-preview__title">Daily planning</div>
                <div class="chat-preview__message">OK!</div>
              </div>
              <div class="chat-preview__date">February, 2019</div>
            </div>
            <div class="chat-preview">
              <div class="chat-preview__avatar" style="background-image: url(${process.env.API_ENDPOINT}/resources/${user?.avatar})"></div>
              <div class="chat-preview__content">
                <div class="chat-preview__title">Daily planning</div>
                <div class="chat-preview__message">OK!</div>
              </div>
              <div class="chat-preview__date">February, 2019</div>
            </div>
            <div class="chat-preview">
              <div class="chat-preview__avatar" style="background-image: url(${process.env.API_ENDPOINT}/resources/${user?.avatar})"></div>
              <div class="chat-preview__content">
                <div class="chat-preview__title">Daily planning</div>
                <div class="chat-preview__message">OK!</div>
              </div>
              <div class="chat-preview__date">February, 2019</div>
            </div>          
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
export default withRouter(withStore(ChatsPage));
