import { useRef, useState, useMemo } from "react";
import ReactQuill from "react-quill";
import styled from "@emotion/styled";
import "react-quill/dist/quill.snow.css";

const QuillEditor = () => {
  const QuillRef = useRef<ReactQuill>();
  const [contents, setContents] = useState("");

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ size: ["small", false, "large", "huge"] }, { color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
            { align: [] },
          ],
          ["image", "video"],
        ],
      },
    }),
    []
  );

  return (
    <EditorComponent>
      <TitleComponet placeholder=" title" />
      <ReactQuillComponent
        ref={(element) => {
          if (element !== null) {
            QuillRef.current = element;
          }
        }}
        value={contents}
        onChange={setContents}
        modules={modules}
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
`;
const ReactQuillComponent = styled(ReactQuill)`
  width: 850px;
  height: 300px;
`;
export default QuillEditor;
