import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from '@emotion/styled';
import { FaEllipsisV } from 'react-icons/fa';

const BookmarkFolder: React.FC = () => {
    const navigate = useNavigate();
    const savedLists = localStorage.getItem('bookmarkLists');
    const parsedLists: string[] = useMemo(
        () => (savedLists ? (JSON.parse(savedLists) as string[]) : []),
        [savedLists]
    );
    const [contextMenuVisibility, setContextMenuVisibility] = useState<boolean[]>(
        parsedLists.map(() => false)
    );
    const [editedListNames, setEditedListNames] = useState<(string | null)[]>(
        parsedLists.map(() => null)
    );

    // 해당 재생목록 페이지로 이동
    const handlePlaylistClick = (listName: string) => {
        navigate(`/playlists?name=${encodeURIComponent(listName)}`);
    };

    // 더보기 아이콘 클릭 이벤트
    const handleContextMenu = (index: number) => (e: React.MouseEvent) => {
        e.stopPropagation();
        setContextMenuVisibility((prevVisibility) =>
            prevVisibility.map((val, i) => (i === index ? !val : false))
        );
    };

    // 재생목록 삭제
    const handleDeleteClick = (index: number, listName: string) => (e: React.MouseEvent) => {
        e.stopPropagation();
        const updatedLists = parsedLists.filter((list) => list !== listName);
        localStorage.setItem('bookmarkLists', JSON.stringify(updatedLists));
        // window.location.reload();
        setContextMenuVisibility((prevState) => prevState.map((_, i) => i !== index));

        // 재생목록이 삭제될 때 해당 인덱스의 editedListNames를 초기화
        const newEditedListNames = [...editedListNames];
        newEditedListNames[index] = null;
        setEditedListNames(newEditedListNames);
    };

    useEffect(() => {
        console.log(parsedLists);
        // parsedLists가 변경될 때 contextMenuVisibility와 editedListNames 초기화
        setContextMenuVisibility(parsedLists.map(() => false));
        setEditedListNames(parsedLists.map(() => null));
    }, [parsedLists]);

    // 수정하기 클릭 이벤트
    const handleEditClick = (index: number, listName: string) => (e: React.MouseEvent) => {
        e.stopPropagation();
        const newListNames = [...editedListNames];
        newListNames[index] = listName;
        setEditedListNames(newListNames);

        setContextMenuVisibility((prevVisibility) =>
            prevVisibility.map((val, i) => (i === index ? !val : val))
        );
    };

    const handleEditInputChange = (index: number, value: string) => {
        const newListNames = [...editedListNames];
        newListNames[index] = value;
        setEditedListNames(newListNames);
    };

    const handleSaveEdit = (index: number) => (e: React.MouseEvent) => {
        e.stopPropagation();
        const editedName = editedListNames[index];
        if (editedName !== null) {
            const updatedLists = [...parsedLists];
            updatedLists[index] = editedName;
            localStorage.setItem('bookmarkLists', JSON.stringify(updatedLists));

            // 수정 완료 후 초기화
            const newListNames = [...editedListNames];
            newListNames[index] = null;
            setEditedListNames(newListNames);

            // 더보기 아이콘 닫기
            setContextMenuVisibility((prevState) => prevState.map((_, i) => i !== index));
        }
    };

    return (
        <BookmarkFolderContainer>
            {/* <div>
                <Link to="/mypage/myvideos/playlistId1">맘에들어 등산</Link>
            </div>
            <div>
                <Link to="/mypage/myvideos/playlistId1">친구랑 같이할거</Link>
            </div> */}
            {parsedLists.length > 0 ? (
                <FolderListArea>
                    {parsedLists.map((list, index) => (
                        <FolderWrapper key={index}>
                            <FolderName>
                                {editedListNames[index] !== null ? (
                                    <>
                                        <InputArea
                                            type="text"
                                            value={editedListNames[index] || ''}
                                            onChange={(e) =>
                                                handleEditInputChange(index, e.target.value)
                                            }
                                            maxLength={10}
                                        />
                                        <SaveButton onClick={handleSaveEdit(index)}>
                                            저장
                                        </SaveButton>
                                    </>
                                ) : (
                                    <>
                                        {list}
                                        <MoreIcon onClick={handleContextMenu(index)} />
                                    </>
                                )}
                            </FolderName>
                            {contextMenuVisibility[index] && (
                                <ContextMenu>
                                    <MenuItem onClick={handleEditClick(index, list)}>
                                        수정하기
                                    </MenuItem>
                                    <MenuItem onClick={handleDeleteClick(index, list)}>
                                        삭제하기
                                    </MenuItem>
                                </ContextMenu>
                            )}
                            <FolderThumbnail onClick={() => handlePlaylistClick(list)}>
                                동영상 썸네일
                            </FolderThumbnail>
                        </FolderWrapper>
                    ))}
                </FolderListArea>
            ) : (
                <ErrorMessage>재생목록이 없습니다.</ErrorMessage>
            )}
        </BookmarkFolderContainer>
    );
};

const BookmarkFolderContainer = styled.div`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const FolderListArea = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    margin: 0 auto;
`;

const FolderWrapper = styled.div`
    width: 700px;
    height: 500px;
    margin: 30px;
    border: 1px solid #ccc;
    padding: 20px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const FolderName = styled.div`
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    border-bottom: 1px solid black;
`;

const InputArea = styled.input`
    width: 80%;
    border: none;
    border-bottom: 1px solid black;
    outline: none;
    background-color: rgba(0, 0, 0, 0);
`;

const SaveButton = styled.button`
    padding: 5px 10px;
    font-size: 12px;
    background-color: #c9c9c9;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const FolderThumbnail = styled.div`
    width: 100%;
    height: 100%;
    margin-bottom: 10px;
    background-color: pink;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const ContextMenu = styled.div`
    position: absolute;
    top: 55px;
    right: 35px;
    display: flex;
    flex-direction: column;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 10px;
    z-index: 100;
`;

const MenuItem = styled.div`
    padding: 10px;
    cursor: pointer;
    border-radius: 10px;
    &:hover {
        background-color: #f0f0f0;
    }
`;

const MoreIcon = styled(FaEllipsisV)`
    cursor: pointer;
`;

const ErrorMessage = styled.p`
    font-size: 1.8rem;
    font-weight: bold;
    color: #181f38;
`;

export default BookmarkFolder;
