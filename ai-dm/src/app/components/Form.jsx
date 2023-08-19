import { React, useState } from 'react'

const Form= ({ formFields, onSubmit }) => {
  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}
      className="bg-red-800 p-6 w-[28rem] rounded-md">
      {Object.keys(formFields).map((fieldName) => {
        const field = formFields[fieldName];
        const { type, label, name, defaultValue} = field;

        return (
          <div key={name} className="mb-2">
            <label 
              htmlFor={name} 
              className="mr-2">
                {label}</label>
            <input
              type={type}
              name={name}
              value={formData[name] || defaultValue}
              onChange={handleInputChange}
              className="bg-red-950 rounded-md"
            />
          </div>
        );
      })}
      <button 
        type="submit"
        className="bg-red-500 px-2 py-0 rounded-md">
          Submit</button>
    </form>
  );
};

export default Form;