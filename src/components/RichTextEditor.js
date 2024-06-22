// src/RichTextEditor.js
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const toolbarOptions = [
  [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
  [{size: []}],
  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
  [{'list': 'ordered'}, {'list': 'bullet'}, 
   {'indent': '-1'}, {'indent': '+1'}],
  ['link', 'image', 'code-block'],
  ['clean']
];

const modules = {
  toolbar: toolbarOptions
};

const RichTextEditor = ({ value, onChange }) => {
  const editorStyle = {
    height: '300px', // Adjust this height as needed
  };

  return (
    <ReactQuill 
      theme="snow" 
      value={value} 
      onChange={onChange} 
      modules={modules}
      style={editorStyle} 
    />
  );
};

export default RichTextEditor;
