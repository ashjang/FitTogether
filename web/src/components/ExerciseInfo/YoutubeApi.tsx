import axios from 'axios';

export type Video = {
    id: {
        videoId: string;
    };
    snippet: {
        title: string;
        thumbnails: {
            default: Thumbnail;
            medium: Thumbnail;
            high: Thumbnail;
        };
    };
};

export type Thumbnail = {
    url: string;
    width: number;
    height: number;
};

export type VideosResponse = {
    nextPageToken: string | null;
    items: Video[];
};

export const YOUTUBE_API_KEY = "AIzaSyCiNRWlBZEQLTiZczKSieY7BS8lOLAA3_8";

let totalResults = 0;
export const fetchVideos = async (pageToken: string | null, category: string): Promise<VideosResponse> => {
    if (totalResults >= 20) {
        return { nextPageToken: null, items: [] }; 
    }
    
    try {
        const response = await axios.get<VideosResponse>('https://www.googleapis.com/youtube/v3/search', {
            params: {
                part: 'snippet',
                maxResults: 4,
                key: YOUTUBE_API_KEY,
                q: category,
                pageToken,
            },
        });

        totalResults += response.data.items.length;

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const resetTotalResults = () => {
    totalResults = 0;
};