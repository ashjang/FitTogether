import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import QuillEditor from '../components/CreatePost,EditPost/QuillEditor';
import PostSetting from '../components/CreatePost,EditPost/PostSetting';
import { useRecoilValue } from 'recoil';
import {
    titleState,
    descriptionState,
    imagesUrlListState,
    hashtagListState,
    categoryState,
    accessLevelState,
} from '../recoil/posts/atoms';

interface DataForEdit {
    savedTitle: string;
    savedDescription: string;
    savedHashtagList: string[];
    savedCategory: string;
    savedAccessLevel: boolean;
    savedImages: string[];
}

const EditPost: React.FC = () => {
    const token = sessionStorage.getItem('token');
    const { postId } = useParams<{ postId: string }>();
    const navigate = useNavigate();
    const location = useLocation();

    const title = useRecoilValue(titleState);
    const description = useRecoilValue(descriptionState);
    const images = useRecoilValue(imagesUrlListState);
    const hashtagList = useRecoilValue(hashtagListState);
    const category = useRecoilValue(categoryState);
    const accessLevel = useRecoilValue(accessLevelState);

    // Link - state 속성을 통해 가져온 데이터를 dataForEdit 할당하여 구조 분해
    const dataForEdit: DataForEdit = location.state.dataForEdit;
    const {
        savedTitle,
        savedDescription,
        savedImages,
        savedHashtagList,
        savedCategory,
        savedAccessLevel,
    } = dataForEdit;

    // QuillEditor 컴포넌트로 전달할 데이터와 PostSetting 컴포넌트로 전달할 데이터를 구분
    const dataForQuillEditorComp = { savedTitle, savedDescription, savedImages };
    const dataForPostSettingComp = { savedHashtagList, savedCategory, savedAccessLevel };

    // 백엔드로 수정한 게시글 정보를 보내는 함수 (API: updateaPost)
    const submitPostForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // 백엔드로 전달하기 위한 데이터 폼
        const postForm = {
            title: title,
            description: description,
            images: images,
            hashtag: hashtagList,
            category: category,
            accessLevel: accessLevel,
        };

        try {
            const response = await axios.put(`/api/posts/${postId}`, postForm, {
                headers: {
                    'X-AUTH-TOKEN': token,
                },
            });
            if (response.status === 200) {
                // 등록에 성공하면 해당 게시글 페이지로 이동
                // path가 업데이트되며 Post 컴포넌트에서 수정된 값으로 리렌더링됨
                navigate(`/posts/${postId}`);
            }
            if (response.status === 400) {
                ('제목/내용/카테고리는 필수 입력 사항입니다.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    // 마운트 시 페이지 최상단으로 이동
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <PostDataForm onSubmit={submitPostForm}>
            <Title>게시글 수정</Title>
            <QuillEditor {...dataForQuillEditorComp} />
            <PostSetting {...dataForPostSettingComp} />
            <SubmitButton type="submit">수정</SubmitButton>
        </PostDataForm>
    );
};

const PostDataForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    margin: 150px auto;
    min-height: calc(100vh - 200px);
    overflow: hidden;
`;

const Title = styled.h2`
    width: 850px;
`;

const SubmitButton = styled.button`
    position: relative;
    left: 400px;
    padding: 0 10px;
    border-style: none;
    border-radius: 15px;
    margin: 5px;
    background-color: #d7d7d7;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
    &: hover {
        box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.8);
    }
`;

export default EditPost;
