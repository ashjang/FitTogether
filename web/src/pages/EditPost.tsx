import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import QuillEditor from '../components/CreatePost,EditPost/QuillEditor';
import PostSetting from '../components/CreatePost,EditPost/PostSetting';
import { useRecoilValue } from 'recoil';
import {
    titleState,
    descriptionState,
    imagesUrlListState,
    hastagListState,
    categoryState,
    accessLevelState,
} from '../recoil/posts/atoms';

const token = sessionStorage.getItem('token');

interface DataForEdit {
    savedTitle: string;
    savedDescription: string;
    savedHashtag: string[];
    savedCategory: string;
    savedAccessLevel: boolean;
    savedImages: string[];
}

const EditPost: React.FC = () => {
    const title = useRecoilValue(titleState);
    const description = useRecoilValue(descriptionState);
    const images = useRecoilValue(imagesUrlListState);
    const hastagList = useRecoilValue(hastagListState);
    const category = useRecoilValue(categoryState);
    const accessLevel = useRecoilValue(accessLevelState);

    const location = useLocation();
    const dataForEdit: DataForEdit = location.state.dataForEdit;
    const {
        savedTitle,
        savedDescription,
        savedImages,
        savedHashtag,
        savedCategory,
        savedAccessLevel,
    } = dataForEdit;

    const dataForQuillEditorComp = { savedTitle, savedDescription, savedImages };
    const dataForPostSettingComp = { savedHashtag, savedCategory, savedAccessLevel };

    const postForm = {
        title: title,
        description: description,
        images: images,
        hastag: hastagList,
        category: category,
        accessLevel: accessLevel,
    };
    console.log(postForm);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        submitPostForm();
    };

    const submitPostForm = async () => {
        try {
            const response = await axios.post('/api/posts', postForm, {
                headers: {
                    'X-AUTH-TOKEN': token,
                },
            });
            if (response.data.status === 'success') {
                const navigate = useNavigate();
                navigate(`/posts/${response.data.postId}`);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <PostDataForm onSubmit={handleSubmit}>
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
    // min-height는 삭제 예정
    min-height: calc(100vh - 300px);
`;

const SubmitButton = styled.button`
    position: relative;
    left: 400px;
    padding: 3px 12px;
    border-radius: 12px;
    border-style: none;
`;

export default EditPost;
