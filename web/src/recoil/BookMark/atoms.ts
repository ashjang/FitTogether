import { atom } from 'recoil';
import { Video } from '../../components/ExerciseInfo/YoutubeApi';

interface Playlist {
    playlistName: string;
    userId: number;
}

export const bookmarkedVideosState = atom<Video[]>({
    key: 'bookmarkedVideosState',
    default: [],
});

export const playlistsDataRecoil = atom<Playlist[] | null>({
    key: 'playlistsDataRecoil',
    default: null,
});
