import { atom } from 'recoil';

interface Playlist {
    playlistName: string;
    userId: number;
}

export const playlistsDataRecoil = atom<Playlist[] | null>({
    key: 'playlistsDataRecoil',
    default: null,
});

export const categoryRecoil = atom<string>({
    key: 'categoryRecoil',
    default: 'running',
});
