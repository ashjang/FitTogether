// const handleEditPost = async () => {
//     const postForm = {
//         title: '',
//         description: '',
//         image: '',
//         category: '',
//         accessLevel: true,
//         hashtag: ['러닝', '등산'],
//     };

//     try {
//         const response = await axios.put(`/posts/${postId}`, postForm, {
//             headers,
//         });
//         console.log(response.data);
//     } catch (error) {
//         console.log(error);
//     }
// };

import React from 'react';
import styled from '@emotion/styled';
import QuillEditor from '../components/CreatePost,EditPost/QuillEditor';
import PostSetting from '../components/CreatePost,EditPost/PostSetting';

interface Props {}

const EditPost: React.FC<Props> = () => {
    return (
        <PostDataForm>
            <QuillEditor />
            <PostSetting />
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
    position: absolute;
    right: 0;
`;

export default EditPost;
