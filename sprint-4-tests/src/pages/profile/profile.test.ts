// import { rest } from 'msw';
import { getByTestId, queryByTestId, waitFor } from '@testing-library/dom'
import { renderBlock, step } from 'tests/renderUtils';
import ProfilePage from './profile';

const USER_MOCK = {
  avatar: "/d66cf98f-05dc-49ba-8d2b-c1db0c5888c3/761d694b-39b5-4dee-ab15-78a2bf05461d_12.png",
  displayName: "Джон дое",
  email: "johndoe2@johndoe2.johndoe2",
  firstName: "Джон",
  id: 3094,
  login: "johndoe2",
  phone: "89137909090",
  secondName: "Дое",
};

describe('pages/Profile', () => {
  it('should logout from profile and redirect to onboarding', async () => {
    await step('render profile page to dom', () => {
      renderBlock({
        Block: ProfilePage,
        props: {},
        state: {
          screen: 'profile',
          appIsInited: true,
          user: USER_MOCK
        },
      });
    });

    await step('click to logout button', () => {
      const button = getByTestId(document.body, 'logout-btn');
      button.click();
    });

    // TODO: добавить проверка показа лоадера

    await step('wait openning onboarding page', async () => {
      await waitFor(() =>
        expect(queryByTestId(document.body, 'onboarding-screen')).toBeInTheDocument()
      );
    });

    await step('check state', async () => {
      expect(window.store.getState().screen).toEqual('onboarding');
      expect(window.store.getState().user).toEqual(null);
    });
  });
});
