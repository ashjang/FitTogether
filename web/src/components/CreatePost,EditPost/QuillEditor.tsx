import { useEffect, useRef } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import styled from '@emotion/styled';
import 'react-quill/dist/quill.snow.css';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { titleState, descriptionState, imagesUrlListState } from '../../recoil/posts/atoms';

// '게시글 수정' 시에만 넘어오는 props의 데이터 타입
interface DataForQuillEditorComp {
    savedTitle: string;
    savedDescription: string;
    savedImages: string[];
}

// 옵션에 상응하는 포맷, 추가해주지 않으면 text editor에 적용된 스타일을 볼수 없음
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

// 사용하고 싶은 옵션, 나열 되었으면 하는 순서대로 나열
const modules = {
    toolbar: {
        container: [
            ['link', 'image', 'video'],
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }],
        ],
    },
};

const QuillEditor: React.FC<DataForQuillEditorComp | {}> = (props) => {
    const [title, setTitle] = useRecoilState(titleState);
    const [description, setDescription] = useRecoilState(descriptionState);
    const setImages = useSetRecoilState(imagesUrlListState);
    const quillRef = useRef<ReactQuill>(null);

    useEffect(() => {
        // 이미지를 처리하기 위한 함수 (API: uploadImage)
        // base64 인코딩 방식은 너무 길기 때문에 서버와 통신에 부적합
        const handleImage = () => {
            const input = document.createElement('input'); // 새로운 파일 업로드 input 요소를 생성
            input.setAttribute('type', 'file'); // type 속성 file로 설정
            input.setAttribute('accept', 'image/*'); // 모든 이미지 파일만 허용
            input.click(); // 파일 선택 대화 상자를 열기 위해 <input> 요소를 클릭
            // 대화 상자에서 이미지 선택이 완료되면 실행되는 함수
            input.onchange = async () => {
                // input.files과 Quill 편집기(quillRef.current)가 존재하는지 확인
                // 하나라도 존재하지 않으면 함수 종료
                if (!input.files || !quillRef.current) return;

                // 선택된 파일을 변수에 file 변수에 넣어줌
                const file = input.files[0];

                // HTTP 요청 body를 위한 FormData 객체를 생성하여 file 추가
                const formData = new FormData();
                formData.append('image', file);

                // for (const entry of formData.entries()) {
                //     console.log(entry);
                // }

                // 이미지 업로드 버튼을 눌렀을 때의 위치를 정의하여 range 변수에 할당
                const range = quillRef.current.getEditor().getSelection(true);

                try {
                    // 서버에 post 요청을 보내 업로드 한뒤 이미지 태그에 삽입할 url을 반환받도록 구현
                    const response = await axios.post('/api/upload', formData);

                    // 백엔드에 등록, 수정 요청 시 필요한 데이터를 따로 저장
                    setImages((prevImagesUrlList) => [...prevImagesUrlList, response.data[0]]);

                    // 에디터의 커서 위치에 이미지 삽입
                    quillRef.current
                        .getEditor()
                        .insertEmbed(range.index, 'image', response.data[0]);
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        // 10MB 이상 데이터 업로드 시 에러 처리
                        if (error.message === 'Network Error') {
                            alert('이미지 크기(10MB)를 초과하였습니다.');
                        }
                    } else {
                        console.error(error);
                    }
                }
            };
        };

        // 툴바에 handleImage 함수 등록
        if (quillRef.current) {
            const toolbar = quillRef.current.getEditor().getModule('toolbar');
            toolbar.addHandler('image', handleImage);
        }

        // '게시글 수정' 시 에디터의 초기값 설정
        if ('savedTitle' in props) setTitle(props.savedTitle as string);
        if ('savedDescription' in props) setDescription(props.savedDescription as string);
        if ('savedImages' in props) setImages(props.savedImages as string[]);
        // props가 전달되지 않았다면 '게시글 작성'이므로 초기값으로 설정
        else {
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
    border: 1px solid #bbb;
    border-bottom: none;
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
