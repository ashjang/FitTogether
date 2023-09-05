import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from '@emotion/styled';
import imgSrc from '../../assets/default-user-image.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { signInInfo } from '../../recoil/AuthState/atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
    postDataRecoil,
    postContentsDataRecoil,
    conmentsDataRecoil,
} from '../../recoil/posts/atoms';
import { loggedInState } from '../../recoil/AuthState/atoms';

const formatDateString = (createdAt: string) => {
    const dateObject = new Date(createdAt);
    const formattedDate = dateObject.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // 24-hour format
    });

    const [date, time] = formattedDate.split(', ');
    const [month, day, year] = date.split('/');
    const [hour, minute] = time.split(':');

    return `${year}/${month}/${day} ${hour}:${minute}`;
};

const Comments: React.FC = () => {
    const token = sessionStorage.getItem('token');
    const isLoggedIn = useRecoilValue(loggedInState);

    const { postId } = useParams<{ postId: string }>();

    // const myInfo = useRecoilValue(signInInfo);
    const myInfo = useRecoilValue(signInInfo);

    const [postData, setPostData] = useRecoilState(postDataRecoil);
    const [postContentsData, setPostContentsData] = useRecoilState(postContentsDataRecoil);
    const [commentsData, setCommentsData] = useRecoilState(conmentsDataRecoil);

    const [replyInput, setReplyInput] = useState<string>('');
    const [childReplyInput, setChildReplyInput] = useState<string>('');
    const [showChildReplyInput, setShowChildReplyInput] = useState<boolean>(false);
    const [currentReplyId, setCurrentReplyId] = useState<number | null>(null);

    // 댓글 입력란에서 입력받을 때 실행할 함수
    const handleReplyInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReplyInput(event.target.value);
    };

    // "댓글 입력" 버튼 눌렀을 때 실행할 함수
    const handleSubmitReply = async () => {
        const replyForm = {
            comment: replyInput,
        };
        try {
            console.log(token);
            const response = await axios.post(`/api/posts/${postId}/comment`, replyForm, {
                headers: {
                    'X-AUTH-TOKEN': token,
                },
            });
            console.log(response.data);
            setCommentsData({
                ...commentsData,
                replyList: response.data.replyList,
                childReplyList: response.data.childReplyList,
            });
            setPostData({ ...postData, replyCount: response.data.replyCount });
            setPostContentsData({
                ...postContentsData,
                replyCount: response.data.replyCount,
            });
            setReplyInput('');
        } catch (error) {
            console.error(error);
        }
    };

    // 댓글 "삭제하기" 버튼 눌렀을 때 실행할 함수
    const handleDeleteReply = async (replyId: number) => {
        console.log(replyId);
        const confirmDelete = window.confirm('정말로 댓글을 삭제하시겠습니까?');
        if (confirmDelete) {
            try {
                console.log(token);
                const response = await axios.delete(`/api/posts/${postId}/comments/${replyId}`, {
                    headers: {
                        'X-AUTH-TOKEN': token,
                    },
                });
                console.log(response.data);
                setCommentsData({
                    ...commentsData,
                    replyList: response.data.replyList,
                    childReplyList: response.data.childReplyList,
                });
                setPostData({ ...postData, replyCount: response.data.replyCount });
                setPostContentsData({
                    ...postContentsData,
                    replyCount: response.data.replyCount,
                });
            } catch (error) {
                console.error(error);
            }
        }
    };

    // 대댓글 입력란에서 입력받을 때 실행할 함수
    const handleChildReplyInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChildReplyInput(event.target.value);
    };

    // "대댓글 입력" 버튼 눌렀을 때 실행할 함수
    const handleSubmitChildReply = async (replyId: number) => {
        console.log(replyId);
        const requestData = {
            comment: childReplyInput,
        };
        try {
            console.log(token);
            const response = await axios.post(
                `/api/posts/${postId}/comments/${replyId}`,
                requestData,
                {
                    headers: {
                        'X-AUTH-TOKEN': token,
                    },
                }
            );
            console.log(response.data);
            setCommentsData({
                ...commentsData,
                replyList: response.data.replyList,
                childReplyList: response.data.childReplyList,
            });
            setPostData({ ...postData, replyCount: response.data.replyCount });
            setPostContentsData({
                ...postContentsData,
                replyCount: response.data.replyCount,
            });

            setChildReplyInput('');
        } catch (error) {
            console.error(error);
        }
    };

    // 대댓글 "삭제하기" 버튼 눌렀을 때 실행할 함수
    const handleDeleteChildReply = async (replyId: number, childReplyId: number) => {
        console.log(replyId, childReplyId);
        const confirmDelete = window.confirm('정말로 댓글을 삭제하시겠습니까?');
        if (confirmDelete) {
            try {
                console.log(token);
                const response = await axios.delete(
                    `/api/posts/${postId}/comments/${replyId}/child-comment/${childReplyId}`,
                    {
                        headers: {
                            'X-AUTH-TOKEN': token,
                        },
                    }
                );
                console.log(response.data);
                setCommentsData({
                    ...commentsData,
                    replyList: response.data.replyList,
                    childReplyList: response.data.childReplyList,
                });
                setPostData({ ...postData, replyCount: response.data.replyCount });
                setPostContentsData({
                    ...postContentsData,
                    replyCount: response.data.replyCount,
                });
            } catch (error) {
                console.error(error);
            }
        }
    };

    // 대댓글 입력창을 토글하는 함수
    const handleToggleChildReplyInput = (replyId: number) => {
        setCurrentReplyId(replyId);
        setShowChildReplyInput((prev) => !prev); // 이전 상태의 반대값으로 토글
    };

    // 댓글 입력란에서 Enter 키 누를 때 호출되는 함수
    const handleReplyInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSubmitReply();
        }
    };

    // 대댓글 입력란에서 Enter 키 누를 때 호출되는 함수
    const handleChildReplyInputKeyDown =
        (replyId: number) => (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
                handleSubmitChildReply(replyId);
            }
        };

    return (
        <CommentsComponent>
            {commentsData?.replyList.map((reply) => (
                <ReplyContainer key={reply.replyId}>
                    <TopDiv>
                        <ProfileImageContainer>
                            <ProfileImage src={reply.userImage ? reply.userImage : imgSrc} />
                        </ProfileImageContainer>
                        <UserId>{reply.userNickname}</UserId>
                        <PostTime>{formatDateString(reply.createdAt)}</PostTime>
                        {myInfo.nickname === reply.userNickname && (
                            <FaTrashCan
                                icon={faTrashCan}
                                onClick={() => {
                                    handleDeleteReply(reply.replyId);
                                }}
                            />
                        )}
                    </TopDiv>
                    <Comment>{reply.comment}</Comment>
                    {commentsData?.childReplyList.map(
                        (childReply) =>
                            childReply.replyId === reply.replyId && (
                                <ChildReplyItem key={childReply.childReplyId}>
                                    <TopDiv>
                                        <ProfileImageContainer>
                                            <ProfileImage
                                                src={
                                                    childReply.userImage
                                                        ? childReply.userImage
                                                        : imgSrc
                                                }
                                            />
                                        </ProfileImageContainer>
                                        <UserId>{childReply.userNickname}</UserId>
                                        <PostTime>
                                            {formatDateString(childReply.createdAt)}
                                        </PostTime>
                                        {myInfo.nickname === childReply.userNickname && (
                                            <FaTrashCan
                                                icon={faTrashCan}
                                                onClick={() => {
                                                    handleDeleteChildReply(
                                                        childReply.replyId,
                                                        childReply.childReplyId
                                                    );
                                                }}
                                            />
                                        )}
                                    </TopDiv>
                                    <Comment>{childReply.comment}</Comment>
                                </ChildReplyItem>
                            )
                    )}
                    {isLoggedIn && (
                        <ToggleChildReplyButton
                            onClick={() => handleToggleChildReplyInput(reply.replyId)}
                        >
                            대댓글 입력
                        </ToggleChildReplyButton>
                    )}
                    {showChildReplyInput && currentReplyId === reply.replyId && (
                        <ChildReplyInputContainer>
                            <ChildReplyInput
                                type="text"
                                placeholder="대댓글을 입력하세요 !"
                                value={childReplyInput}
                                onChange={handleChildReplyInputChange}
                                onKeyDown={handleChildReplyInputKeyDown(reply.replyId)}
                            />
                            <ChildReplyButton onClick={() => handleSubmitChildReply(reply.replyId)}>
                                대댓글 입력
                            </ChildReplyButton>
                        </ChildReplyInputContainer>
                    )}
                </ReplyContainer>
            ))}
            {isLoggedIn && (
                <ReplyInputContainer>
                    <ReplyInput
                        type="text"
                        placeholder="댓글을 입력하세요 !"
                        value={replyInput}
                        onChange={handleReplyInputChange}
                        onKeyDown={handleReplyInputKeyDown}
                    />
                    <ReplyButton onClick={handleSubmitReply}>댓글 입력</ReplyButton>
                </ReplyInputContainer>
            )}
        </CommentsComponent>
    );
};

const CommentsComponent = styled.div`
    width: 850px;
    margin: 0 auto;
    margin-top: 20px;
`;

const ProfileImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    border: 1px transparent solid;
    border-radius: 50%;
    overflow: hidden;
`;

const ProfileImage = styled.img`
    display: block;
    padding: 0px;
    width: 35px;
    height: 35px;
`;

const ReplyContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px 0;
    border-bottom: 1px solid #d7d7d7;
`;

const ChildReplyItem = styled.div`
    height: 60px;
    margin-left: 50px;
`;

const TopDiv = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
`;

const UserId = styled.p`
    margin: 0 10px;
    font-size: 16px;
    font-weight: bold;
`;

const PostTime = styled.p`
    margin: 5px 0 0 0;
    font-size: 10px;
`;

const FaTrashCan = styled(FontAwesomeIcon)`
    position: absolute;
    right: 0;
`;

const Comment = styled.p`
    height: 40px;
    margin: 0;
    font-size: 14px;
    margin-left: 45px;
`;

const ReplyInputContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;
`;
const ChildReplyInputContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    margin-bottom: 15px;
`;

const ReplyInput = styled.input`
    width: 1000px;
    padding: 5px;
    margin: 10px 0;
    padding-right: 100px;
    border: 0;
    border-radius: 10px;
    outline: none;
    padding-left: 10px;
    background-color: rgb(222, 222, 222);
`;
const ChildReplyInput = styled.input`
    width: 500px;
    padding: 5px;
    margin-left: 45px;
    padding-right: 100px;
    border: 0;
    border-radius: 10px;
    outline: none;
    padding-left: 10px;
    background-color: rgb(222, 222, 222);
`;

const ReplyButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0px;
    height: 27px;
    padding: 3px 10px 0px;
    border: 0;
    border-radius: 7px;
    margin-right: 3px;
    outline: none;
    background-color: #c7c7c7;
    font-size: 14px;
`;
const ChildReplyButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 305px;
    height: 27px;
    padding: 3px 10px 0px;
    border: 0;
    border-radius: 7px;
    margin-right: 3px;
    outline: none;
    background-color: #c7c7c7;
    font-size: 14px;
`;

const ToggleChildReplyButton = styled.div`
    margin-left: 45px;
    padding: 5px 0;
    cursor: pointer;
    font-size: 0.7rem;
    color: blue;
`;

export default Comments;
