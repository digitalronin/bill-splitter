import React from 'react';

const NumberInput = (props) => {
  return (
    <div>
      <label>{props.label}</label>
      <input
        value={props.value}
        onChange={(event) => props.onChange(event)}
      />
    </div>
  );
}

export default NumberInput;

