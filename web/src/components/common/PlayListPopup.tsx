import React from 'react';
import { useRecoilState } from 'recoil';
import { playListState, Video } from '../../recoil/PlayList/atoms';

type Props = {
    video: Video;
    onClose: () => void;
};

const PlayListPopup: React.FC<Props> = ({ video, onClose }) => {
    const [playLists, setPlayLists] = useRecoilState(playListState);

    const handleToggleVideo = (listId: string) => {
        const updatedPlayLists = playLists.map((list) => {
            if (list.id === listId) {
                const videoExists = list.videos.find((v) => v.id.videoId === video.id.videoId);
                return {
                    ...list,
                    videos: videoExists
                        ? list.videos.filter((v) => v.id.videoId !== video.id.videoId)
                        : [...list.videos, video],
                };
            }
            return list;
        });

        // Recoil 상태 업데이트
        setPlayLists(updatedPlayLists);
    };

    return (
        <div>
            {playLists.map((list) => (
                <div key={list.id}>
                    <h3>{list.name}</h3>
                    <button onClick={() => handleToggleVideo(list.id)}>
                        {list.videos.find((v) => v.id.videoId === video.id.videoId)
                            ? 'Remove from Playlist'
                            : 'Add to Playlist'}
                    </button>
                </div>
            ))}
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default PlayListPopup;
