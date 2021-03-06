import React from 'react';
import TextField from '@material-ui/core/TextField';

const NumberInput = (props) => {
  return (
    <div className="userInput">
      <TextField
        type="number"
        label={props.label}
        value={props.value}
        onChange={(event) => props.onChange(event)}
        variant={props.variant}
      />
    </div>
  );
}

export default NumberInput;

