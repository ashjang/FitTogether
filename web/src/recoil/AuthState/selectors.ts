import { selector } from 'recoil';

import { loggedInState } from './atoms';

export const isLoginSelector = selector({
    key: 'isLoginSelector',
    get: ({ get }) => !!get(loggedInState),
});
