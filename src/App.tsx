// App.tsx
import { useState } from 'react';
import { CssBaseline, Box, createTheme, ThemeProvider } from '@mui/material';
import Sidebar, { SidebarOption } from './components/Sidebar';
import Platforms from './components/entities/platforms/Platforms'; 
import Cruises from './components/entities/CruiseTable';
import Ships from './components/entities/ShipTable';
import Lines from './components/entities/LineTable';
import Contacts from './components/entities/ContactTable';
import InteractiveMap from './components/dashboards/InteractiveMap';
import Summary from './components/dashboards/Summary';
import Implementation from './components/dashboards/Implementation';
import Instrumentation from './components/dashboards/Instrumentation';
import CruisePlanning from './components/dashboards/CruisePlanning';
import CreateDashboard from './components/dashboards/CreateDashboard';
import CreateReport from './components/reports/CreateReport';
import MonthlyAnalysis from './components/reports/MonthlyAnalysis';
import Home from './components/Home';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const [selectedOption, setSelectedOption] = useState<SidebarOption>('Home'); // Default selection

  
  const renderMainContent = () => {
    switch (selectedOption) {
      case 'Home':
        return <Home />;
      case 'Platforms':
        return <Platforms />;
      case 'Cruises':
        return <Cruises />;
      case 'Ships':
        return <Ships />;
      case 'Lines':
        return <Lines />;
      case 'Contacts':
        return <Contacts />;
      case 'Interactive Map':
        return <InteractiveMap />;
      case 'Summary':
        return <Summary />;
      case 'Implementation':
        return <Implementation />;
      case 'Instrumentation':
        return <Instrumentation />;
      case 'Cruise Planning':
        return <CruisePlanning />;
      case 'Create Dashboard':
        return <CreateDashboard />;
      case 'Create Report':
        return <CreateReport />;
      case 'Monthly Analysis':
        return <MonthlyAnalysis />;
      default:
        return <Home />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh', width: '100vw' }}>
        {/* Sidebar Component */}
        <Sidebar 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode} 
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />

        {/* Main Content Area */}
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            p: 0, 
            display: 'flex', 
            flexDirection: 'column',
            width: 'calc(100% - [sidebar-width])', 
          }}
        >
          <Box sx={{ width: '100%', flexGrow: 1 }}> 
            {renderMainContent()}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
