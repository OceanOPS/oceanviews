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
import MainTopbar from './components/MainTopbar';
import Home from './components/Home';
import SearchPage from './components/SearchPage';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SidebarOption>('Home');
  const [searchText, setSearchText] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchActive, setSearchActive] = useState(false);

  const sidebarSearchRef = useRef<HTMLInputElement>(null);
  
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
	breakpoints: {
		values: {
		  xs: 0,
		  sm: 900,  
		  md: 1200,
		  lg: 1500,
		  xl: 2500,
		},
	  },
  });

  const toggleDarkMode = () => setDarkMode((prevMode) => !prevMode);

  const handleSetSearchText = (text: string) => {
    setSearchText(text);
  };

  const handleSearchFocus = () => {
    setSearchActive(true);
  };

  const handleSearchBlur = () => {
    setSearchActive(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <MainTopbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        sidebarSearchRef={sidebarSearchRef}
        setSearchText={handleSetSearchText}
		sidebarOpen={sidebarOpen}  
        setSidebarOpen={setSidebarOpen}  
		onSearchFocus={handleSearchFocus} 
        onSearchBlur={handleSearchBlur} 
      />

      <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)', width: '100vw', marginTop: '64px' }}>
       
        <Box
          sx={{
            width: sidebarOpen ? 280 : 60,
            transition: 'width 0.3s',
            height: '100%',
            position: 'relative',
            zIndex: 1,
          }}
        >
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
        </Box>

		<Box
		component="main"
		sx={{
			flexGrow: 1,
			p: 0,
			overflow: 'auto',
			height: 'calc(100vh - 64px)', 
			width: '100%',
		}}
		>
			
		{searchActive ? (
            <SearchPage searchText={searchText} />
          ) : (
            <>
              {selectedOption === 'Platforms' && <Platforms />}
              {selectedOption === 'Cruises' && <Cruises />}
              {selectedOption === 'Ships' && <Ships />}
              {selectedOption === 'Lines' && <Lines />}
              {selectedOption === 'Contacts' && <Contacts />}
              {selectedOption === 'GOOS' && <OperationalGoos />}
              {selectedOption === 'Argo' && <Summary />}
              {selectedOption === 'Implementation' && <Implementation />}
              {selectedOption === 'Instrumentation' && <Instrumentation />}
              {selectedOption === 'Cruise Planning' && <CruisePlanning />}
              {selectedOption === 'Create Dashboard' && <CreateDashboard />}
              {selectedOption === 'Home' && <Home sidebarSearchRef={sidebarSearchRef} setSearchText={handleSetSearchText} />}
            </>
          )}
		</Box>

      </Box>
    </ThemeProvider>
  );
}

export default App;