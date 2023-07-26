import styled from '@emotion/styled';

const VideoPopupContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
`;
type VideoPopupProps = {
    video: {
        id: string;
        title: string;
    };
    onClose: () => void;
};
function VideoPopup({ video, onClose }: VideoPopupProps) {
    return (
        <VideoPopupContainer onClick={onClose}>
            <CloseButton onClick={onClose}>닫기</CloseButton>
            <iframe 
                width="560" 
                height="315" 
                src={`https://www.youtube.com/embed/${video.id}`} 
                title={video.title} 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
            </iframe>
        </VideoPopupContainer>
    );
}

export default VideoPopup;
