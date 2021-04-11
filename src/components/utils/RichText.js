import React from "react";
import { Editor } from "@tinymce/tinymce-react";
const RichText = ({ content, setContent }) => {
  // Render the Slate context.
  return (
    <Editor
      value={content}
      init={{
        height: 500,
        menubar: false,
      }}
      onEditorChange={(e) => setContent(e)}
    />
  );
};
export default RichText;
