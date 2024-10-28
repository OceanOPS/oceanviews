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
	  backgroundColor: '#ffffff',
	  border: '1px solid',
	  borderColor: theme.palette.mode === 'dark' ? '#555' : '#ddd', // Subtle border color based on theme
	  padding: '2px 16px',
	  fontSize: '1.5rem',
	  color: 'black',
	  fontFamily: 'Montserrat !important',
	  boxShadow: theme.palette.mode === 'dark' 
		? '0px 4px 8px rgba(0, 0, 0, 0.2)' // Dark theme shadow
		: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Light theme shadow
	},
	'& .MuiOutlinedInput-notchedOutline': {
	  border: 'none',
	},
	'& .MuiInputBase-input::placeholder': {
	  color: theme.palette.mode === 'dark' ? '#888' : '#aaa',
	  opacity: 1,
	  fontFamily: 'Montserrat !important'
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
