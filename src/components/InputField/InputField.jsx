const InputField = ({ type, placeholder, name, value, onChange, error }) => (
    <>
      <input
        type={type}
        placeholder={placeholder}
        className={`input input-bordered input-info w-full max-w-xs dark:bg-gray-700 dark:text-white transition-all duration-500 ${error && 'input-error'}`}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </>
  );
  export default InputField ;