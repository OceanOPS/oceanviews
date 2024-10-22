import { useState } from 'react';
import { Drawer, IconButton, Typography, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Brightness4, Brightness7, ChevronLeft, Menu as MenuIcon, TableChart as TableChartIcon } from '@mui/icons-material';
import MapIcon from '@mui/icons-material/Public';
import AssessmentIcon from '@mui/icons-material/Assessment';
import BuildIcon from '@mui/icons-material/Build';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import WaterIcon from '@mui/icons-material/Water';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import SailingIcon from '@mui/icons-material/Sailing';
import TimelineIcon from '@mui/icons-material/Timeline';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LoginIcon from '@mui/icons-material/Login';
import AddIcon from '@mui/icons-material/Add';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import HomeIcon from '@mui/icons-material/Home';

export type SidebarOption = 
  | 'Home'
  | 'Interactive Map'
  | 'Summary'
  | 'Implementation'
  | 'Instrumentation'
  | 'Platforms'
  | 'Cruises'
  | 'Ships'
  | 'Lines'
  | 'Contacts'
  | 'Login'
  | 'Cruise Planning'
  | 'Create Dashboard'
  | 'Monthly Analysis'
  | 'Create Report';

// Define your icons in a mapping for easy access
const iconMapping = {
  "Home": <HomeIcon />,
  "Interactive Map": <MapIcon />,
  "Summary": <AssessmentIcon />,
  "Implementation": <BuildIcon />,
  "Instrumentation": <SettingsInputComponentIcon />,
  "Platforms": <WaterIcon />,
  "Cruises": <DirectionsBoatIcon />,
  "Ships": <SailingIcon />,
  "Lines": <TimelineIcon />,
  "Contacts": <ContactMailIcon />,
  "Login": <LoginIcon />,
  'Cruise Planning': <ImportExportIcon />,
  'Create Dashboard': <AddIcon />,
  'Monthly Analysis': <AutoGraphIcon />,
  'Create Report': <AddIcon />
};

interface SidebarProps {
	darkMode: boolean;
	toggleDarkMode: () => void;
	selectedOption: SidebarOption;
	setSelectedOption: (option: SidebarOption) => void;
  }

const Sidebar: React.FC<SidebarProps> = ({ darkMode, toggleDarkMode, selectedOption, setSelectedOption }) => {
  const [open, setOpen] = useState(true);

  // Handle hover events for the main sidebar body (excluding the header)
  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    // setOpen(false); // Keep this commented if you don't want auto-collapse
  };

  const handleClick = (option: SidebarOption) => {
    setSelectedOption(option); // Update the selected option
  };

  const drawerWidth = 280;

// Map over the iconMapping and render ListItems dynamically
const renderListItems = (category: string, options: SidebarOption[]) => (
    <>
      {category != '' ? <Typography
        variant="subtitle2"
        sx={{
          fontSize: '0.8rem',
          marginBottom: '4px',
          paddingLeft: '17px',
          paddingBottom: '0px',
          paddingTop: '14px',
          height: '42px',
		  color: darkMode ? "#03a9f4" : "#009af4"
        }}
      >
        {open ? category : '  '}
      </Typography> : <></>}

      <List sx={{ padding: 0 }}>
        {options.map(option => (
          <ListItem
            component="li"
            key={option}  
            sx={{ 
              height: '42px', 
			  cursor: 'pointer',
              color: selectedOption === option ? (darkMode ? "#03a9f4" : "#009af4") : 'inherit', // Text color change
			  fontWeight: (selectedOption === option ? 'semi-bold' : 'regular'),
			  backgroundColor: darkMode 
			  ? (selectedOption === option ? '#333333' : 'inherit') // Darker shade for dark mode
			  : (selectedOption === option ? '#f0f0f0' : 'inherit'), // Lighter shade for light mode
			'&:hover': {
			  backgroundColor: darkMode 
				? (selectedOption === option ? '#444444' : '#555555') // Darker hover effect for dark mode
				: (selectedOption === option ? '#e0e0e0' : '#f5f5f5'), // Lighter hover effect for light mode
			}
            }}
            onClick={() => handleClick(option)}
          >
            <ListItemIcon
              sx={{ 
                color: selectedOption === option ? (darkMode ? "#03a9f4" : "#009af4"): 'inherit', // Icon color change
              }}
            >
              {iconMapping[option]}
            </ListItemIcon>
            <ListItemText 
              primary={option} 
              sx={{ 
                display: open ? 'block' : 'none', 
                color: selectedOption === option ? (darkMode ? "#03a9f4" : "#009af4") : 'inherit', // Text color change
				fontWeight: (selectedOption === option ? 'semi-bold' : 'regular')
              }} 
            />
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? drawerWidth : 60,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : 60,
          boxSizing: 'border-box',
          transition: 'width 0.3s',
          overflowY: open ? 'auto': 'hidden',
          overflowX: 'hidden',
        },
      }}
    >
      {/* Sidebar Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 9px 6px 9px',
		  color: darkMode ? "#03a9f4" : "#009af4"
        }}
      >
         <Typography variant="h6" noWrap sx={{ display: open ? 'block' : 'none', paddingLeft: '10px', paddingRight: '0px', marginRight: '0px' }}>
			Ocean
			<Typography variant="h6" component="span" sx={{ fontWeight: '600' }}>
			Views
			</Typography>
		</Typography>
        <IconButton onClick={() => setOpen(!open)}>
          {open ? <ChevronLeft /> : <MenuIcon />}
        </IconButton>
      </Box>

      {/* Main Body */}
      <Box
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        {renderListItems('', [
          'Home'
        ])}

        {/* Dashboards section */}
        {renderListItems('DASHBOARDS', [
          'Interactive Map',
          'Summary',
          'Implementation',
          'Instrumentation',
          'Cruise Planning',
          'Create Dashboard'
        ])}

        {/* Tables section */}
        {renderListItems('GOOS ENTITIES', [
          'Platforms',
          'Cruises',
          'Ships',
          'Lines',
          'Contacts',
        ])}

		{/* Reports section */}
        {renderListItems('REPORTS', [
          'Monthly Analysis',
          'Create Report'
        ])}

        {/* Dark mode toggle */}
        <Box sx={{ marginTop: 'auto' }}>
          <List>
		  <ListItem component="li" sx={{cursor: 'pointer'}}>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary={'Log In'} sx={{ display: open ? 'block' : 'none' }} />
            </ListItem>
            <ListItem component="li" onClick={toggleDarkMode} sx={{cursor: 'pointer'}}>
              <ListItemIcon>
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </ListItemIcon>
              <ListItemText primary={darkMode ? 'Light Mode' : 'Dark Mode'} sx={{ display: open ? 'block' : 'none' }} />
            </ListItem>
          </List>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
