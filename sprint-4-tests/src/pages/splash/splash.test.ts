import { getByTestId } from '@testing-library/dom'
import { SplashPage } from './splash';
import { renderBlock } from 'tests/renderUtils';

describe('pages/Splash', () => {
  it('should render logo', () => {
    renderBlock({
      Block: SplashPage,
      props: {},
    });

    expect(getByTestId(document.body, 'splash-logo')).toBeInTheDocument();
  });
});
