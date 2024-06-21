const InputField = ({ type, placeholder, name, value, onChange, error }) => {
  const isSpecialError = error === 'Password must be at least 6 characters long' || error === 'Email is invalid' || error ==="Passwords do not match"||error ==="Phone must be exactly 11 digits"||error=="The email has already been taken.";

  return (
    <div className="relative flex items-center w-full max-w-xs m-auto">
      <input
        type={type}
        placeholder={placeholder}
        className={`input input-bordered input-info w-full dark:bg-gray-700 dark:text-white transition-all duration-500 ${error ? 'border-red-500' : ''}`}
        name={name}
        value={value}
        onChange={onChange}
        style={error && !isSpecialError ? { '::placeholder': { color: 'red' } } : {}}
      />
      {error && isSpecialError && (
        <div className="tooltip tooltip-open tooltip-right absolute left-full ml-2" data-tip={error}>
          <button className="btn btn-error btn-sm">!</button>
        </div>
      )}
    </div>
  );
};

export default InputField;
