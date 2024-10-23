import React from 'react';
import { TextField, TextFieldProps, useTheme } from '@mui/material';

const CustomTextField: React.FC<TextFieldProps> = (props) => {
  const theme = useTheme();

  return (
    <TextField
      {...props}
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

export default CustomTextField;
