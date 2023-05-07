import React, { useState } from "react";
import RichTextEditor from "react-rte";

const TextEditor = ({ onChange }) => {
  const [value, setValue] = useState(RichTextEditor.createEmptyValue());

  const onChangeEditor = (value) => {
    setValue(value);
    if (onChange) {
      onChange(value.toString("html"));
    }
  };
  return (
    <div>
      <RichTextEditor value={value} onChange={onChangeEditor} className="min-h-[200px]"/>
    </div>
  );
};

export default TextEditor;
