import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
    key: 'sessionStorage',
    storage: sessionStorage,
});

// 초기값: 로그인이 되어 있지 않은 상태
export const loggedInState = atom({
    key: 'loggedInState',
    default: false,
    effects_UNSTABLE: [persistAtom],
});

// 유저 정보 수정 가능 여부
export const canEditInfo = atom({
    key: 'canEditInfo',
    default: false,
    effects_UNSTABLE: [persistAtom],
});

// 로그인 요청하는 유저의 정보
export const signInInfo = atom({
    key: 'signInState',
    default: {
        nickname: '',
    },
    effects_UNSTABLE: [persistAtom],
});
