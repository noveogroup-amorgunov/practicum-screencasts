import Block from '../../core/Block';

import './modal.css';

type Props = {
  isOpened?: boolean
}

export class Modal extends Block {
  static componentName = 'Modal';

  constructor({ isOpened }: Props) {
    super({ isOpened, events: { click: (event) => this.onClose(event) } });

    this.setProps({
      onClose: () => this.onClose()
    })
  }

  onClose(event: MouseEvent | undefined) {
    if (event) {
      if (event.target.classList.contains('modal-overlay')) {
        this.setProps({isOpened: false})
      }
      return
    }
    this.setProps({isOpened: false})
  }

  render() {
    if (!this.props.isOpened) {
      return '<div class="modal modal_hidden"></div>';
    }

    return `
      <div>
        <div class="modal-overlay"></div>
        <div class="modal">
          <div data-slot=1></div>
          {{{Button onClick=onClose text="Close" }}}
        </div>
      </div>
    `;
  }
}
