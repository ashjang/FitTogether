import { atom } from 'recoil';
import { Video } from '../../components/ExerciseInfo/YoutubeApi';

export const bookmarkedVideosState = atom<Video[]>({
    key: 'bookmarkedVideosState',
    default: [],
});

export const playlistState = atom<string[]>({
    key: 'playlistState',
    default: [],
});
