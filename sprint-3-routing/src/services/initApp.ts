import { authAPI } from 'api/auth';
import { UserDTO } from 'api/types';
import type { Dispatch } from 'core';
import { transformUser, apiHasError } from 'utils';

export async function initApp(dispatch: Dispatch<AppState>) {
  dispatch({ isLoading: true });

  try {
    const response = await authAPI.me();

    if (apiHasError(response)) {
      return;
    }

    dispatch({ user: transformUser(response as UserDTO) });
  } catch (err) {
    console.error(err);
  } finally {
    dispatch({ isLoading: false });
  }
}
