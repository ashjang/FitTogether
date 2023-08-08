/// <reference types="vite/client" />
declare global {
    interface Window {
        kakao: any;
    }
}
interface ImportMetaEnv {
    VITE_APP_GEO_CODE_API_KEY: string;
}

export {};
