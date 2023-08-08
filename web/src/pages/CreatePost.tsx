import React from 'react';
import styled from '@emotion/styled';
import QuillEditor from '../components/CreatePost,EditPost/QuillEditor';
import PostSetting from '../components/CreatePost,EditPost/PostSetting';

const CreatePost: React.FC = () => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log(formData);
    };

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
