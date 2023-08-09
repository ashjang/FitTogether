import { useRef } from 'react';
// import { useMemo, useEffect } from 'react';
import ReactQuill from 'react-quill';
import styled from '@emotion/styled';
import 'react-quill/dist/quill.snow.css';
import { useRecoilState } from 'recoil';
import { titleState, descriptionState } from '../../recoil/posts/atoms';

const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'align',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'background',
    'color',
    'link',
    'image',
    'video',
    'width',
];

const modules = {
    toolbar: {
        container: [
            ['link', 'image', 'video'],
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
        ],
    },
};

const QuillEditor = () => {
    const [title, setTitle] = useRecoilState(titleState);
    const [description, setDescription] = useRecoilState(descriptionState);
    const quillRef = useRef<ReactQuill>(null);
    console.log(description);

    // useEffect(() => {
    //     const handleImage = () => {
    //         const input = document.createElement('input');
    //         input.setAttribute('type', 'file');
    //         input.setAttribute('accept', 'image/*');
    //         input.click();
    //         input.onchange = async () => {
    //             if (!input.files || !quillRef.current) return;
    //             const file = input.files[0];

    //             const { getEditor } = quillRef.current;
    //             const range = getEditor().getSelection(true);

    //             try {
    //                 // 서버에 업로드 한뒤 이미지 태그에 삽입할 url을 반환받도록 구현
    //                 const filePath = `contents/temp/${Date.now()}`;
    //                 const url = await uploadImage(file, filePath);

    //                 // 받아온 url을 이미지 태그에 삽입
    //                 quillRef.current.getEditor().insertEmbed(range.index, 'image', url);

    //                 // 사용자 편의를 위해 커서 이미지 오른쪽으로 이동
    //                 // quillRef.current.getEditor().setSelection(range.index + 1);
    //             } catch (error) {
    //                 console.log(error);
    //             }
    //         };
    //     };

    //     if (quillRef.current) {
    //         const { getEditor } = quillRef.current;
    //         const toolbar = getEditor().getModule('toolbar');
    //         toolbar.addHandler('image', handleImage);
    //     }
    // }, []);

    return (
        <EditorComponent>
            <TitleComponet
                name="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder=" title"
            />
            <ReactQuillComponent
                ref={quillRef}
                placeholder="contents..."
                value={description}
                theme="snow"
                modules={modules}
                formats={formats}
                onChange={setDescription}
            />
        </EditorComponent>
    );
};
const EditorComponent = styled.div`
    margin: 50px 0;
`;

const TitleComponet = styled.input`
    width: 850px;
    font-size: 20px;
    border-style: none;
    &:focus {
        outline: none;
    }
`;
const ReactQuillComponent = styled(ReactQuill)`
    width: 850px;
    height: 300px;
`;
export default QuillEditor;
