import { useState } from 'react';
import { Drawer, Box } from '@mui/material';
import SidebarHeader from './SidebarHeader'; 
import SidebarList from './SidebarList'; 
import DarkModeToggle from './DarkModeToggle';
import { SidebarOption } from '../../types/types'; 

interface SidebarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  selectedOption: SidebarOption;
  setSelectedOption: (option: SidebarOption) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ darkMode, toggleDarkMode, selectedOption, setSelectedOption }) => {
  const [open, setOpen] = useState(true);

  const handleMouseEnter = () => setOpen(true);
  const handleMouseLeave = () => {};

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
