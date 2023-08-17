import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import QuillEditor from '../components/CreatePost,EditPost/QuillEditor';
import PostSetting from '../components/CreatePost,EditPost/PostSetting';
import { useRecoilState } from 'recoil';
import {
    titleState,
    descriptionState,
    imagesUrlListState,
    hashtagListState,
    categoryState,
    accessLevelState,
} from '../recoil/posts/atoms';

const CreatePost: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const navigate = useNavigate();

    const token = sessionStorage.getItem('token');

    const [title, setTitle] = useRecoilState(titleState);
    const [description, setDescription] = useRecoilState(descriptionState);
    const [hashtagList, setHashtagList] = useRecoilState(hashtagListState);
    const [category, setCategory] = useRecoilState(categoryState);
    const [accessLevel, setAccessLevel] = useRecoilState(accessLevelState);
    const [images, setImages] = useRecoilState(imagesUrlListState);

    const submitPostForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const postForm = {
            title: title,
            description: description,
            images: images,
            hashtag: hashtagList,
            category: category,
            accessLevel: accessLevel,
        };
        console.log(postForm);

        try {
            console.log(token);
            const response = await axios.post('/api/posts', postForm, {
                headers: {
                    'X-AUTH-TOKEN': token,
                },
            });
            if (response.status === 200) {
                navigate(`/posts/${response.data.id}`);
                setTitle('');
                setDescription('');
                setHashtagList([]);
                setCategory('');
                setAccessLevel(true);
                setImages([]);
            }
            if (response.status === 400) {
                ('제목/내용/카테고리는 필수 입력 사항입니다.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <PostDataForm onSubmit={submitPostForm}>
            <Title>게시글 작성</Title>
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
    margin: 150px auto;
    min-height: calc(100vh - 200px);
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

export default CreatePost;
