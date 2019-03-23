import React from 'react';
import TextField from '@material-ui/core/TextField';

const NumberInput = (props) => {
  return (
    <div className="userInput">
      <TextField
        label={props.label}
        value={props.value}
        onChange={(event) => props.onChange(event)}
      />
    </div>
  );
}

export default NumberInput;

