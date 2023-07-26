type Video = {
    id: string;
    thumbnail: string;
    title: string;
};

interface Item {
    id: {
        videoId: string;
    };
    snippet: {
        thumbnails: {
            default: {
                url: string;
            };
        };
        title: string;
    };
}

const API_KEY = 'AIzaSyCfmtIFijnjp9e--1hTc5FICf3mippF2kY';

export const fetchVideosFromYoutubeAPI = async (
    activeTab: string,
    page: number,
    maxResults: number
): Promise<Video[]> => {
    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${encodeURIComponent(activeTab)}&type=video&part=snippet&maxResults=${maxResults}&pageToken=${page}`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch videos from YouTube API');
        }

        const data = await response.json() as { items: Item[] };

        if (!data.items) {
            throw new Error('Invalid response data from YouTube API');
        }

        const videos: Video[] = data.items.map((item: Item) => ({
            id: item.id.videoId,
            thumbnail: item.snippet.thumbnails.default.url,
            title: item.snippet.title,
        }));

        return videos;
    } catch (error) {
        console.error('Error fetching videos from YouTube API:', error);
        return [];
    }
};