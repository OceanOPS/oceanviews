import React from 'react';
import { TextField, TextFieldProps, useTheme } from '@mui/material';

type CustomNumberFieldProps = TextFieldProps & {
  min?: number;
  max?: number;
};

const CustomNumberField: React.FC<CustomNumberFieldProps> = ({ min, max, ...props }) => {
  const theme = useTheme();

  return (
    <TextField
      {...props}
      type="number" // Ensures it is a number field
      inputProps={{
        min, // Set min value from props
        max, // Set max value from props
        ...props.inputProps, // Include any additional inputProps passed
      }}
      variant="outlined"
      size="small"
      sx={{
        minWidth: '200px',
        backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#000',
        '& .MuiOutlinedInput-root': {
          backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#000',
          color: theme.palette.text.primary,
        },
      }}
    />
  );
};

export default CustomNumberField;
