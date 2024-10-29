import { IconButton, Typography, Box } from '@mui/material';
import { ChevronLeft, Menu as MenuIcon } from '@mui/icons-material';

interface SidebarHeaderProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  darkMode: boolean;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ open, setOpen, darkMode }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 9px 6px 9px',
        color: darkMode ? "#03a9f4" : "#009af4",
      }}
    >
      <Typography variant="h5" noWrap sx={{ display: open ? 'block' : 'none', paddingLeft: '10px', marginRight: '0px' }}>
        Ocean
        <Typography variant="h5" component="span" sx={{ fontWeight: '600' }}>
          UI
        </Typography>
      </Typography>
      <IconButton onClick={() => setOpen(!open)}>
        {open ? <ChevronLeft /> : <MenuIcon />}
      </IconButton>
    </Box>
  );
};

export default SidebarHeader;
