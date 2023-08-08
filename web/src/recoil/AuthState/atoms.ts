import { atom } from 'recoil';

// 초기값: 로그인이 되어 있지 않은 상태
export const loggedInState = atom({
    key: 'loggedInState',
    default: false,
});

// 로그인하는 유저의 정보
export const signInInfo = atom({
    key: 'signInState',
    default: {
        nickname: '',
        password: '',
    },
});

// 카카오 로그인 초기상태: 토큰이 없거나 로그아웃 상태임
export const kakaoAccessTokenState = atom<string | undefined | null>({
    key: 'kakaoAccessToken',
    // default: localStorage.getItem('token_for_kakaotalk'),
    default: null,
});

export const userInfoState = atom({
    key: 'userInfoState',
    default: {
        nickName: '',
        password: '',
        email: '',
        profilePicture: null,
        gender: '',
        introduction: '',
        exerciseChoice: [],
        publicInfo: true,
        accessToken: '',
    },
});

// export const authState = atom({
//     key: 'authState',
//     default: {
//         isLoggedIn: false,
//         userId: null as number | null, // 아이디의 타입을 지정합니다
//         // other user info...
//     },
// });

// export const emailState = atom<string>({
//     key: 'emailState',
//     default: '', // 초기값은 비어있는 문자열로 설정하거나, 로그인 시에 로그인한 사용자의 이메일 값을 설정합니다.
// });
