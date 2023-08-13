import { atom } from 'recoil';

export type Video = {
    id: {
        videoId: string;
    };
};

export type PlayList = {
    id: string;
    name: string;
    videos: Video[];
};

export const playListState = atom<PlayList[]>({
    key: 'playListState',
    default: [],
});
