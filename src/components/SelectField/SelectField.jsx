const SelectField = ({ options, name, value, onChange, error }) => (
    <>
      <select
        className={`input input-bordered input-info w-full max-w-xs dark:bg-gray-700 dark:text-white transition-all duration-500 ${error && 'input-error'}`}
        name={name}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </>
  );

export default SelectField;