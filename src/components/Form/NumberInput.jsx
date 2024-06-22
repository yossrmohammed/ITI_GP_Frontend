import React from 'react';

const NumberInput = ({ label, name, value, onChange, error, placeholder }) => {
  return (
    <div className="md:flex md:items-center mb-6">
      <div className="md:w-1/3">
        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
          {label}
        </label>
      </div>
      <div className="md:w-2/3">
        <input
          type="number"
          name={name}
          id={name}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          className="input input-bordered input-sm w-full max-w-xs"
        />
        {error ? (
          <p className="mt-3" style={{ color: 'red', fontSize: '14px' }}>
            {error}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default NumberInput;
