import { useState } from 'react';
import { Drawer, Box, TextField, InputAdornment, IconButton, ListItemIcon, ListItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SidebarHeader from './SidebarHeader'; 
import SidebarList from './SidebarList'; 
import DarkModeToggle from './DarkModeToggle';
import { SidebarOption } from '../../types/types'; 

interface SidebarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  selectedOption: SidebarOption;
  setSelectedOption: (option: SidebarOption) => void;
  sidebarSearchRef: React.RefObject<HTMLInputElement>;
  setSearchText: (text: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ darkMode, toggleDarkMode, selectedOption, setSelectedOption, sidebarSearchRef, setSearchText, open, setOpen }) => {
	
  const handleMouseEnter = () => setOpen(true);
  const handleMouseLeave = () => {};

  const handleSearchFocus = () => {
    setSelectedOption("Search");
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? 280 : 60,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? 280 : 60,
          transition: 'width 0.3s',
          overflowX: 'hidden',
        },
      }}
    >
      <SidebarHeader open={open} setOpen={setOpen} darkMode={darkMode} />

      <Box onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        
      <Box sx={{ padding: open ? 2 : 0, textAlign: 'center' }}>
          {open ? (
            <TextField
			  inputRef={sidebarSearchRef}
              variant="outlined"
              placeholder="Search the GOOS"
              size="small"
			  onFocus={handleSearchFocus} 
			  onChange={handleSearchChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                sx: {
                  fontFamily: 'Montserrat, sans-serif',
                  '&::placeholder': {
                    fontFamily: 'Montserrat, sans-serif',
                  },
                },
              }}
              inputProps={{
                sx: {
                  fontFamily: 'Montserrat, sans-serif',
                },
              }}
            />
          ) : (
            <ListItem
              sx={{
                height: '42px',
                marginTop: '14px',
                marginBottom: '16px',
                justifyContent: 'center',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: darkMode ? '#555' : '#f5f5f5',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 'auto', color: darkMode ? "#03a9f4" : "#009af4" }}>
                <IconButton size="small">
                  <SearchIcon />
                </IconButton>
              </ListItemIcon>
            </ListItem>
          )}
        </Box>

        {/* Home, Interactive Map, and Log In options */}
        <SidebarList
          category=""
          options={['Home', 'Log In', 'Map']}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          darkMode={darkMode}
          open={open}
        />

        {/* Other sections */}
        <SidebarList
          category="DASHBOARDS"
          options={['Summary', 'Implementation', 'Instrumentation', 'Cruise Planning', 'Create Dashboard']}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          darkMode={darkMode}
          open={open}
        />
        <SidebarList
          category="CATALOGUE"
          options={['Platforms', 'Cruises', 'Ships', 'Lines', 'Contacts']}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          darkMode={darkMode}
          open={open}
        />
        <SidebarList
          category="REPORTS"
          options={['Monthly Analysis', 'Create Report']}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          darkMode={darkMode}
          open={open}
        />

        {/* Push Dark Mode Toggle to the bottom */}
        <Box sx={{ marginTop: 'auto' }}>
          <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} open={open} />
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
