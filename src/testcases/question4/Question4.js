import React, { useState } from 'react';

const mockOptions = {
  option1: 'Option 1',
  option2: 'Option 2',
  option3: 'Option 3',
};

const nationalityOptions = ['American', 'British', 'Canadian', 'Other'];

const Question4 = () => {
  const [formInputs, setFormInputs] = useState({
    firstName: '',
    lastName: '',
    selectedOption: '',
    isMarried: false,
    selectedNationality: '',
    phoneNumber: '',
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormInputs((prevInputs) => ({
      ...prevInputs,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handlePhoneNumberChange = (event) => {
    const input = event.target.value.replace(/\D/g, ''); // Remove non-digit characters
    const formattedPhoneNumber = input.replace(
      /^(\d{3})(\d{3})(\d{4})$/,
      '($1)$2-$3'
    );
    setFormInputs((prevInputs) => ({
      ...prevInputs,
      phoneNumber: formattedPhoneNumber,
    }));
  };

  const isValidPhoneNumber = () => {
    // Basic validation: check if the formatted phone number has the correct length
    return formInputs.phoneNumber.replace(/\D/g, '').length === 10;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your form submission logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">
          First Name:
          <input
            type="text"
            name="firstName"
            value={formInputs.firstName}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label htmlFor="lastName">
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formInputs.lastName}
            onChange={handleInputChange}
          />
        </label>
      </div>

      <div>
        <label>Options:</label>
        {Object.entries(mockOptions).map(([value, label]) => (
          <div
            key={value}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <label
              style={{ marginRight: '10px', width: '100px' }}
              key={value}
              htmlFor="selectedOption"
            >
              {label}
            </label>
            <input
              style={{ width: '50px' }}
              type="radio"
              name="selectedOption"
              value={value}
              checked={formInputs.selectedOption === value}
              onChange={handleInputChange}
            />
          </div>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '10px',
        }}
      >
        <label
          htmlFor="isMarried"
          style={{ marginRight: '10px', width: '100px' }}
        >
          Married
        </label>
        <input
          style={{ width: '50px' }}
          type="checkbox"
          name="isMarried"
          checked={formInputs.isMarried}
          onChange={handleInputChange}
        />
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '10px',
        }}
      >
        <label
          htmlFor="selectedNationality"
          style={{ width: '100px', marginRight: '10px' }}
        >
          Nationality:
        </label>
        <select
          style={{ width: '100px' }}
          name="selectedNationality"
          value={formInputs.selectedNationality}
          onChange={handleInputChange}
        >
          <option value="">Select Nationality</option>
          {nationalityOptions.map((nationality) => (
            <option key={nationality} value={nationality}>
              {nationality}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="phoneNumber">
          Phone Number:
          <input
            type="text"
            name="phoneNumber"
            value={formInputs.phoneNumber}
            onChange={handlePhoneNumberChange}
            maxLength="14" // Set maximum length to accommodate the formatted phone number
          />
          {!isValidPhoneNumber() && (
            <span style={{ color: 'red' }}>Invalid phone number format</span>
          )}
        </label>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Question4;
