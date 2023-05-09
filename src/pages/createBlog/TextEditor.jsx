import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import RichTextEditor from "react-rte";
import { Hidden } from "@mui/material";

const TextEditor = ({ onChange }) => {
  const [value, setValue] = useState(() => RichTextEditor.createEmptyValue());

  const editor = useRef(null);

  const [content, setContent] = useState("");

  const handleUpdate = (event) => {
    setContent(event);
    if (onChange) {
      onChange(event);
    }
  };
  
  return (
    <div>
      <JoditEditor
        ref={editor}
        value={content}
        config={{
          readonly: false,
          height: 250,
        }}
        onBlur={handleUpdate}
        onChange={()=>{}}
      />
    </div>
  );
};

export default TextEditor;
