import React from 'react';

const FileInput = ({ onChange }) => (
  <input
    type="file"
    name="image"
    className="file-input file-input-bordered file-input-info w-full max-w-xs m-auto"
    onChange={onChange}
  />
);

export default FileInput;
