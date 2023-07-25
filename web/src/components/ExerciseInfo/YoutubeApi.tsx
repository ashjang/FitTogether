// YoutubeApi.tsx
type Video = {
    id: string;
    thumbnail: string;
    title: string;
};

const DUMMY_VIDEOS: { [key: string]: Video[] } = {
    러닝: [
        { id: 'running1', thumbnail: 'https://via.placeholder.com/150x200', title: 'Running Video 1' },
        { id: 'running2', thumbnail: 'https://via.placeholder.com/150x200', title: 'Running Video 2' },
    ],
    등산: [
        { id: 'hiking1', thumbnail: 'https://via.placeholder.com/150x200', title: 'Hiking Video 1' },
        { id: 'hiking2', thumbnail: 'https://via.placeholder.com/150x200', title: 'Hiking Video 2' },
    ],
    헬스: [
        { id: 'fitness1', thumbnail: 'https://via.placeholder.com/150x200', title: 'Fitness Video 1' },
        { id: 'fitness2', thumbnail: 'https://via.placeholder.com/150x200', title: 'Fitness Video 2' },
    ],
};



export const fetchVideosFromYoutubeAPI = async (activeTab: string, page: number, maxResults: number): Promise<Video[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const startIndex = (page - 1) * maxResults;
            const endIndex = startIndex + maxResults;
            const videos = DUMMY_VIDEOS[activeTab].slice(startIndex, endIndex) || [];
            resolve(videos);
        }, 1000);
    });
};

