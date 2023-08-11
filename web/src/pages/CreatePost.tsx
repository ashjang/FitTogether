import React from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import QuillEditor from '../components/CreatePost,EditPost/QuillEditor';
import PostSetting from '../components/CreatePost,EditPost/PostSetting';
import { useRecoilState } from 'recoil';
import {
    titleState,
    descriptionState,
    imagesUrlListState,
    hastagListState,
    categoryState,
    accessLevelState,
} from '../recoil/posts/atoms';

const CreatePost: React.FC = () => {
    const [title, setTitle] = useRecoilState(titleState);
    const [description, setDescription] = useRecoilState(descriptionState);
    const [hastagList, setHastagList] = useRecoilState(hastagListState);
    const [category, setCategory] = useRecoilState(categoryState);
    const [accessLevel, setAccessLevel] = useRecoilState(accessLevelState);
    const [images, setImages] = useRecoilState(imagesUrlListState);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const postForm = {
            title: title,
            description: description,
            images: images,
            hastag: hastagList,
            category: category,
            accessLevel: accessLevel,
        };
        console.log(postForm);

        setTitle('');
        setDescription('');
        setHastagList([]);
        setCategory('');
        setAccessLevel(true);
        setImages([]);

        // submitPostForm();
    };

    // const submitPostForm = async () => {
    // try {
    //     const response = await axios.post('/posts', postForm, {
    //         headers,
    //     });
    //     if (response.data.status === 'success') {
    //         const navigate = useNavigate();
    //         navigate(`/posts/${response.data.postId}`);
    //     }
    // } catch (error) {
    //     console.log(error);
    //     throw error;
    // }
    // };

    return (
        <PostDataForm onSubmit={handleSubmit}>
            <QuillEditor />
            <PostSetting />
            <SubmitButton type="submit">등록</SubmitButton>
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

export default CreatePost;
