import { atom, useRecoilState } from 'recoil';

// 초기값: 로그인이 되어 있지 않은 상태
export const loggedInState = atom({
    key: 'loggedInState',
    default: '',
});

// signInState atom 정의 (타입 정보 추가)
export interface SignInState {
    nickname: string;
    password: string;
}

export const signInState = atom<SignInState>({
    key: 'signInState',
    default: {
        nickname: '',
        password: '',
    },
});

// 로그인 토큰 설정
export function useSetTokenState() {
    const [, setToken] = useRecoilState(loggedInState);

    // 로그인 상태를 업데이트하는 함수를 반환
    return (token: string) => {
        setToken(token);
    };
}

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
