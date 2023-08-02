import React from 'react';
import styled from '@emotion/styled';
import QuillEditor from '../components/CreatePost/QuillEditor';

interface Props {}

const CreatePost: React.FC<Props> = () => {
    return (
        <Page>
            <QuillEditor />
            <SettingField>
                <SettingItem>
                    <About>해시태그</About>
                    <input />
                </SettingItem>
                <SettingItem>
                    <About>카테고리</About>
                    <CategoryTab>
                        <button>러닝</button>
                        <button>등산</button>
                        <button>헬스</button>
                    </CategoryTab>
                </SettingItem>
                <SettingItem>
                    <About>공개 범위</About>
                    <PublicTab>
                        <button>전체</button>
                        <button>메이트</button>
                    </PublicTab>
                </SettingItem>
                <SubmitButton>등록</SubmitButton>
            </SettingField>
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

const SettingField = styled.div`
    position: relative;
    width: 850px;
`;

const SettingItem = styled.div`
    display: flex;
    margin-bottom: 10px;
`;

const About = styled.p`
    width: 100px;
`;

const CategoryTab = styled.div`
    display: flex;
`;

const PublicTab = styled.div`
    display: flex;
`;

const SubmitButton = styled.button`
    position: absolute;
    right: 0;
`;

export default CreatePost;
