import React from 'react';

const TextInput = ({ label, name, value, onChange, error, placeholder }) => {
  return (
    <div className='md:flex md:flex-col md:items-center mb-1'>
         <div className="mb-1">
      <label className="block text-gray-500 font-bold ">
        {label}
      </label>
      <input
        type="text"
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className="input input-bordered  w-full"
      />
    </div>
        {error ? (
              <div className="" style={{ color: 'red', fontSize: '14px' }}>
                {error}
              </div>
        ) : null}
    </div>


  );
};

export default TextInput;
