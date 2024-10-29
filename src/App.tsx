import { useRef, useState } from 'react';
import { CssBaseline, Box, createTheme, ThemeProvider } from '@mui/material';
import Sidebar from './components/sidebar/Sidebar';
import { SidebarOption } from './types/types';
import Platforms from './components/catalogue/platforms/Platforms'; 
import Cruises from './components/catalogue/cruises/CruiseTable';
import Ships from './components/catalogue/ships/ShipTable';
import Lines from './components/catalogue/lines/LineTable';
import Contacts from './components/catalogue/contacts/ContactTable';
import OperationalGoos from './components/dashboards/OperationalGoos';
import Summary from './components/dashboards/Summary';
import Implementation from './components/dashboards/Implementation';
import Instrumentation from './components/dashboards/Instrumentation';
import CruisePlanning from './components/dashboards/CruisePlanning';
import CreateDashboard from './components/dashboards/CreateDashboard';
import CreateReport from './components/reports/CreateReport';
import MonthlyAnalysis from './components/reports/MonthlyAnalysis';
import SearchPage from './components/SearchPage';
import Home from './components/Home';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SidebarOption>('Home');
  const [searchText, setSearchText] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const sidebarSearchRef = useRef<HTMLInputElement>(null);
  
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSetSearchText = (text: string) => {
    setSidebarOpen(true);
    setSearchText(text);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh', width: '100vw' }}>
        <Sidebar 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode} 
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
		  sidebarSearchRef={sidebarSearchRef}
		  setSearchText={handleSetSearchText}
		  open={sidebarOpen}
          setOpen={setSidebarOpen}
        />
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            p: 0, 
            display: 'flex', 
            flexDirection: 'column',
            width: 'calc(100% - [sidebar-width])'
          }}
        >
          <Box sx={{ width: '100%', flexGrow: 1 }}> 
		    {selectedOption === 'Search' && <SearchPage  searchText={searchText} />}
            {selectedOption === 'Platforms' && <Platforms />}
            {selectedOption === 'Cruises' && <Cruises />}
            {selectedOption === 'Ships' && <Ships />}
            {selectedOption === 'Lines' && <Lines />}
            {selectedOption === 'Contacts' && <Contacts />}
            {/* Keep InteractiveMap loaded, just hide it when not active */}
            <Box sx={{ display: selectedOption === 'Operational GOOS' ? 'block' : 'none' }}>
              <OperationalGoos />
            </Box>
            {selectedOption === 'Summary' && <Summary />}
            {selectedOption === 'Implementation' && <Implementation />}
            {selectedOption === 'Instrumentation' && <Instrumentation />}
            {selectedOption === 'Cruise Planning' && <CruisePlanning />}
            {selectedOption === 'Create Dashboard' && <CreateDashboard />}
            {selectedOption === 'Create Report' && <CreateReport />}
            {selectedOption === 'Monthly Analysis' && <MonthlyAnalysis />}
            {selectedOption === 'Home' && <Home sidebarSearchRef={sidebarSearchRef}  setSearchText={handleSetSearchText}/>}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
