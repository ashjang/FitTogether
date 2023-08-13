import { selector } from 'recoil';

import { TokenAtom } from './atoms';

export const isLoginSelector = selector({
    key: 'isLoginSelector',
    get: ({ get }) => !!get(TokenAtom),
});
