import { Button } from "../button";
import { renderBlock } from "tests/renderUtils";
import { getByRole, prettyDOM } from "@testing-library/dom";

function renderButton({ onClick }: any) {
  renderBlock({
    Block: Button,
    props: { text: '123', onClick },
  })

  return getByRole(document.body, 'button')
}

describe('components/Button', () => {

  // ЮНИТ-тест на UI компонент
  // могут называть интеграционным тестом
  it('should render button', () => {
    const button = renderButton({ onClick: () => {} })

    expect(button).toBeInTheDocument()
  });

  // ЮНИТ-тест на UI компонент с событием
  it('should call onClick when user press button', () => {
    
    // 1 Arrange
    const mock = jest.fn()
    
    renderBlock({
      Block: Button,
      props: { text: '123', onClick: mock },
    })

    // 2 Act
    getByRole(document.body, 'button').click()

    // 3 Assert
    expect(mock).toBeCalled();
  });
});