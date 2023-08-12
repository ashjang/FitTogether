import { atom } from 'recoil';

// 초기값: 로그인이 되어 있지 않은 상태
export const loggedInState = atom({
    key: 'loggedInState',
    default: false,
});

// 카카오 로그인 초기상태: 토큰이 없거나 로그아웃 상태임
export const kakaoAccessTokenState = atom<string | undefined | null>({
    key: 'kakaoAccessToken',
    default: localStorage.getItem('token_for_kakaotalk'),
    // default: null,
});

// 로그인 요청하는 유저의 정보
export const signInInfo = atom({
    key: 'signInState',
    default: {
        nickname: '',
        password: '',
    },
});

// 회원가입한 유저의 정보
export const signUpInfo = atom({
    key: 'signUpInfo',
    default: {
        nickname: '',
        password: '',
        email: '',
        profilePicture: '',
        gender: true,
        introduction: '',
        exerciseChoice: [''],
        publicInfo: true,
        accessToken: '',
    },
});
