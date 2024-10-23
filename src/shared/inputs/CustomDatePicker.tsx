import React from 'react';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { useTheme } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const CustomDatePicker: React.FC<DatePickerProps<any>> = (props) => {
  const theme = useTheme();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        {...props}
        format="YYYY-MM-DD"
        slotProps={{
          textField: {
            size: 'small',
            sx: {
              minWidth: '200px',
              backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#000',
              '& .MuiOutlinedInput-root': {
                backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#000',
                color: theme.palette.text.primary,
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
