const FileInput = ({ onChange }) => (
    <input
      type="file"
      className="input input-info w-full max-w-xs dark:bg-gray-700 dark:text-white transition-all duration-500"
      onChange={onChange}
    />
  );

export default FileInput;