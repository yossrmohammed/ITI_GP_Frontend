const SelectField = ({ options, name, value, onChange, error }) => (
    <>
      <select
        className={`input input-bordered input-info w-full max-w-xs m-auto dark:bg-gray-700 dark:text-white transition-all duration-500 ${error && 'input-error'}`}
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
      {error  && (
         <div className="tooltip tooltip-open tooltip-right absolute left-full ml-2" data-tip={error}>
         <button className="btn btn-error btn-sm">!</button>
       </div>
      )}
    </>
  );

export default SelectField;