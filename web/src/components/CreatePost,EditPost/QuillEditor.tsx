import { useRef, useMemo } from 'react';
import ReactQuill from 'react-quill';
import styled from '@emotion/styled';
import 'react-quill/dist/quill.snow.css';
import { useRecoilState } from 'recoil';
import { titleState, descriptionState } from '../../recoil/posts/atoms';

export const formats = [
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

const QuillEditor = () => {
    const QuillRef = useRef<ReactQuill>();
    const [title, setTitle] = useRecoilState(titleState);
    const [description, setDescription] = useRecoilState(descriptionState);

    const modules = useMemo(
        () => ({
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
        }),
        []
    );

    return (
        <EditorComponent>
            <TitleComponet
                name="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder=" title"
            />
            <ReactQuillComponent
                ref={(element) => {
                    if (element !== null) {
                        QuillRef.current = element;
                    }
                }}
                value={description}
                onChange={setDescription}
                modules={modules}
                formats={formats}
                theme="snow"
                placeholder="contents..."
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
