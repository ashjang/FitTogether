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

// export const YOUTUBE_API_KEY = 'AIzaSyDPiKdEMBJDeWYQwijKyYRw_VVO0ePIr1c';
// export const YOUTUBE_API_KEY = 'AIzaSyD26946NOfQsR5aSkR4cfZnx5sUq-B-dTg';
// export const YOUTUBE_API_KEY = 'AIzaSyASbmi09zmEJHh-6wd9j9F40j2519wYGoo';
export const YOUTUBE_API_KEY = 'AIzaSyAIXJnQWRynbV5Lg1f1lRGTz95vYzj8WUM';
// export const YOUTUBE_API_KEY = "AIzaSyB6Es_UBvC3ygEEGaruLVXDCX6OyUWIKPE";
// export const YOUTUBE_API_KEY = "AIzaSyAGwV_z2kIHmQKYqgpodo1QyFpt2O2mADk";
// export const YOUTUBE_API_KEY = "AIzaSyDoSnXhlTJyL0bXj3p52a1q7HsOkGS2Y4s";
// export const YOUTUBE_API_KEY = "AIzaSyCiNRWlBZEQLTiZczKSieY7BS8lOLAA3_8";
// export const YOUTUBE_API_KEY = 'AIzaSyA8ZKl91vxcAFpcHn2MM3wl45-MRr_7Yfo';

let totalResults = 0;
export const fetchVideos = async (
    pageToken: string | null,
    category: string
): Promise<VideosResponse> => {
    if (totalResults >= 20) {
        return { nextPageToken: null, items: [] };
    }

    try {
        const response = await axios.get<VideosResponse>(
            'https://www.googleapis.com/youtube/v3/search',
            {
                params: {
                    part: 'snippet',
                    maxResults: 4,
                    key: YOUTUBE_API_KEY,
                    q: category,
                    pageToken,
                },
            }
        );

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
