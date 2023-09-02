import { atom } from 'recoil';

interface Playlist {
    playlistName: string;
    userId: number;
}

interface VideoInPlaylist {
    videoId: string;
    title: string;
    thumbnail: string;
}

export const playlistsDataRecoil = atom<Playlist[] | null>({
    key: 'playlistsDataRecoil',
    default: null,
});

export const categoryRecoil = atom<string>({
    key: 'categoryRecoil',
    default: 'running',
});

export const videoInPlaylistRecoil = atom<Record<string, VideoInPlaylist[]> | null>({
    key: 'videoInPlaylistRecoil',
    default: null,
});
