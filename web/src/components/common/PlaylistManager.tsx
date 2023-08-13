import React, { useState } from 'react';
import { Video } from '../ExerciseInfo/YoutubeApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface Props {
    video: Video;
    favoriteStatus: boolean;
    toggleFavorite: (videoId: string) => void;
}

const PlaylistManager: React.FC<Props> = ({ video, favoriteStatus, toggleFavorite }) => {
    const [showPopup, setShowPopup] = useState(false);

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleFavorite(video.id.videoId);
    };

    const handlePopupClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowPopup(!showPopup);
    };

    return (
        <div>
            <div onClick={handlePopupClick}>
                <FontAwesomeIcon icon={faPlus} /> {/* + 아이콘 */}
            </div>
            {showPopup && (
                <div>
                    {/* 여기에 팝업 컨텐츠를 넣을 수 있습니다. */}
                    <button
                        onClick={() => {
                            /* 새 플레이리스트 생성 로직 */
                        }}
                    >
                        새로 만들기
                    </button>
                </div>
            )}
            {/* 기타 영상 정보 및 즐겨찾기 아이콘 */}
            <h4>
                {video.snippet.title}
                <FontAwesomeIcon
                    icon={faPlus}
                    onClick={handleFavoriteClick}
                    className={`star-icon ${favoriteStatus ? 'opened' : ''}`}
                />
            </h4>
            <img
                src={video.snippet.thumbnails.high?.url || video.snippet.thumbnails.default.url}
                alt={video.snippet.title}
            />
        </div>
    );
};

export default PlaylistManager;
