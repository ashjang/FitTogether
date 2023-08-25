import { useEffect, useRef } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import styled from '@emotion/styled';
import 'react-quill/dist/quill.snow.css';
import { useRecoilState } from 'recoil';
import { titleState, descriptionState, imagesUrlListState } from '../../recoil/posts/atoms';

interface DataForQuillEditorComp {
    savedTitle: string;
    savedDescription: string;
    savedImages: string[];
}

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

const QuillEditor: React.FC<DataForQuillEditorComp | {}> = (props) => {
    const [title, setTitle] = useRecoilState(titleState);
    const [description, setDescription] = useRecoilState(descriptionState);
    const [images, setImages] = useRecoilState(imagesUrlListState);
    const quillRef = useRef<ReactQuill>(null);
    console.log(description);

    useEffect(() => {
        const handleImage = () => {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            input.click();
            input.onchange = async () => {
                if (!input.files || !quillRef.current) return;

                // 선택된 파일을 변수에 file 변수에 넣어줌
                const file = input.files[0];

                const formData = new FormData();
                formData.append('image', file);
                for (const entry of formData.entries()) {
                    console.log(entry);
                }

                // range는 '이미지 업로드 버튼'을 눌렀을 때의 위치
                const range = quillRef.current.getEditor().getSelection(true);

                try {
                    // 서버에 post 요청을 보내 업로드 한뒤 이미지 태그에 삽입할 url을 반환받도록 구현
                    const response = await axios.post('/api/upload', formData);
                    console.log(response.data);

                    setImages((prevImagesUrlList) => [...prevImagesUrlList, response.data[0]]);
                    console.log(images);

                    quillRef.current
                        .getEditor()
                        .insertEmbed(range.index, 'image', response.data[0]);
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        if (error.message === 'Network Error') {
                            alert('이미지 크기(10MB)를 초과하였습니다.');
                        }
                    } else {
                        console.error('오류 발생:', error);
                    }
                }
            };
        };

        if (quillRef.current) {
            // const { getEditor } = quillRef.current;
            const toolbar = quillRef.current.getEditor().getModule('toolbar');
            toolbar.addHandler('image', handleImage);
        }

        console.log(props);

        if ('savedTitle' in props) setTitle(props.savedTitle as string);
        if ('savedDescription' in props) setDescription(props.savedDescription as string);
        if ('savedImages' in props) setImages(props.savedImages as string[]);
        else {
            setTitle('');
            setDescription('');
            setImages([]);
        }

        if (!props) {
            setTitle('');
            setDescription('');
            setImages([]);
        }
    }, []);

    return (
        <EditorComponent>
            <TitleComponet
                name="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder=" title"
            />
            <Quill>
                <ReactQuillComponent
                    ref={quillRef}
                    placeholder="contents..."
                    value={description}
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    onChange={setDescription}
                />
            </Quill>
        </EditorComponent>
    );
};

const EditorComponent = styled.div``;

const TitleComponet = styled.input`
    width: 850px;
    font-size: 20px;
    margin-top: 25px;
    border-style: none;
    &:focus {
        outline: none;
    }
`;

const Quill = styled.div`
    margin-bottom: 25px;
    height: 350px;
    background-color: white;
`;

const ReactQuillComponent = styled(ReactQuill)`
    width: 850px;
    height: 307px;
`;
export default QuillEditor;
