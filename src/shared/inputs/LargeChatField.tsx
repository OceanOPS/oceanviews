import { TextField, styled } from '@mui/material';

interface CustomTextFieldProps {
  placeholder: string;
  value: string;
  inputRef: React.RefObject<HTMLInputElement>;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '38px',
    backgroundColor: '#f0f0f0',
    border: 'none',
    padding: '10px 16px',
    color: 'black',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '& .MuiInputBase-input::placeholder': {
    color: theme.palette.mode === 'dark' ? '#888' : '#aaa',
    opacity: 1,
  },
}));

const CustomTextFieldComponent: React.FC<CustomTextFieldProps> = ({
  placeholder,
  value,
  inputRef,
  onChange,
  onKeyPress,
}) => (
  <CustomTextField
    variant="outlined"
    placeholder={placeholder}
    fullWidth
    inputRef={inputRef}
    value={value}
    onChange={onChange}
    onKeyPress={onKeyPress}
  />
);

export default CustomTextFieldComponent;
