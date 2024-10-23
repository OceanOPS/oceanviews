import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Brightness4, Brightness7, Login as LoginIcon } from '@mui/icons-material';

interface DarkModeToggleProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  open: boolean;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ darkMode, toggleDarkMode, open }) => {
  return (
    <List>
      <ListItem sx={{ cursor: 'pointer' }}>
        <ListItemIcon>
          <LoginIcon />
        </ListItemIcon>
        {open && <ListItemText primary={'Log In'} />}
      </ListItem>
      <ListItem sx={{ cursor: 'pointer' }} onClick={toggleDarkMode}>
        <ListItemIcon>{darkMode ? <Brightness7 /> : <Brightness4 />}</ListItemIcon>
        {open && <ListItemText primary={darkMode ? 'Light Mode' : 'Dark Mode'} />}
      </ListItem>
    </List>
  );
};

export default DarkModeToggle;
