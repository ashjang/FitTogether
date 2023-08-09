import { initializeApp, getApp, getApps } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// 파이어베이스 Config
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FB_API_KEY,
    authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FB_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FB_MESSAGE_ID,
    appId: process.env.REACT_APP_FB_APP_ID,
    measurementId: process.env.REACT_APP_FB_MEASUREMENT_ID,
};

// 파이어베이스 앱 초기화/설정 (이미 초기화되어있으면 기존 설정 사용)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// 사용할 기능들은 알아보기 쉽게 이름을 지은뒤 export 해서 필요한곳에 사용하자
// export const db = getFirestore();
// export const storage = getStorage();
// export const auth = getAuth();

export default app;

import firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
