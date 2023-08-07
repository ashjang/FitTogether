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
        <Page>
            <QuillEditor />
            <PostSetting />
        </Page>
    );
};

const Page = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // min-height는 삭제 예정
    min-height: calc(100vh - 300px);
`;

export default EditPost;
