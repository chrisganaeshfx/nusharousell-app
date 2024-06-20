import React from 'react';

function Dropdown({ label, value, options, onChange }) {
  return (
    <div className="pdtdropdown">
      <label htmlFor={label.toLowerCase()}>{label}</label>
      <div className="select-dropdown">
        <button type="button">
          {value || `Select ${label}`} <i className="fa fa-caret-down"></i>
        </button>
        <div className="dropdown-content">
          {options.map(option => (
            <a href="#" key={option} onClick={() => onChange(option)}>
              {option}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dropdown;