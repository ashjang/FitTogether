// src/common/VideoListItem.tsx
import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

type VideoListItemProps = {
    videoTitle: string;
    onRemove: () => void;
};

const VideoListItem: React.FC<VideoListItemProps> = ({ videoTitle, onRemove }) => {
    return (
        <VideoItem>
            <VideoTitle>{videoTitle}</VideoTitle>
            <RemoveButton onClick={onRemove}>
                <FontAwesomeIcon icon={faTimes} />
            </RemoveButton>
        </VideoItem>
    );
};

const VideoItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #ccc;
    padding: 10px;
    margin: 5px 0;
    background-color: #f0f0f0;
`;

const VideoTitle = styled.span`
    flex: 1;
`;

const RemoveButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: red;
`;

export default VideoListItem;
