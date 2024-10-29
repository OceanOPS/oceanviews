import { useState, useEffect, useRef } from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import PanelBox from '../shared/PanelBox';
import CustomTextField from '../shared/inputs/LargeChatField';

interface HomeProps {
	sidebarSearchRef: React.RefObject<HTMLInputElement>;
	setSearchText: (text: string) => void;
  }
  

const Home: React.FC<HomeProps> = ({ sidebarSearchRef, setSearchText }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentMessage, setCurrentMessage] = useState('');

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (currentMessage.length > 2) {
	  	setSearchText(currentMessage);
		setTimeout(() => {
			if(sidebarSearchRef.current){
				sidebarSearchRef.current.value = currentMessage; 
				sidebarSearchRef.current.focus(); 
			}
		}, 150);
	}
	
  }, [currentMessage]);

  const handleButtonClick = (text: string) => {
    setCurrentMessage(text);
  };

  const buttonExamples = [
    { label: 'USA', color: '#777777' },
    { label: 'Maria', color: '#777777' },
    { label: 'Argo', color: '#777777' },
    { label: '290177', color: '#777777' }
  ];

  const monitoringButtonConfigs = [
    { name: "GOOS Dashboard", icon: <span role="img" aria-label="search">🔍</span>, onClick: () => {} },
    { name: "Static Maps", icon: <span role="img" aria-label="edit">✏️</span>, onClick: () => {} },
    { name: "Report cards", icon: <span role="img" aria-label="report">📊</span>, onClick: () => {} },
    { name: "KPIs", icon: <span role="img" aria-label="report">📊</span>, onClick: () => {} },
    { name: "Alerts", icon: <span role="img" aria-label="report">📊</span>, onClick: () => {} },
  ];

  const integrationButtonConfigs = [
    { name: "Request IDs", icon: <span role="img" aria-label="search">🔍</span>, onClick: () => {} },
    { name: "File Upload", icon: <span role="img" aria-label="edit">✏️</span>, onClick: () => {} },
    { name: "Submit forms", icon: <span role="img" aria-label="report">📊</span>, onClick: () => {} },
    { name: "API", icon: <span role="img" aria-label="report">📊</span>, onClick: () => {} },
  ];

  const coordinationButtonConfigs = [
    { name: "Plan cruises", icon: <span role="img" aria-label="search">🔍</span>, onClick: () => {} },
    { name: "Quality Control", icon: <span role="img" aria-label="edit">✏️</span>, onClick: () => {} },
    { name: "Coordinators", icon: <span role="img" aria-label="report">📊</span>, onClick: () => {} },
    { name: "Outreach", icon: <span role="img" aria-label="report">📊</span>, onClick: () => {} },
  ];

  return (
    <Box sx={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 2,
      textAlign: 'center',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <Box sx={{ marginTop: 2, width: '100%', maxWidth: '600px' }}>
        <CustomTextField
				  placeholder="Search the GOOS"
				  value={currentMessage}
				  inputRef={inputRef}
				  onChange={(e) => setCurrentMessage(e.target.value)} onKeyPress={function (event: React.KeyboardEvent<HTMLInputElement>): void {
					  throw new Error('Function not implemented.');
				  } }        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
          <Typography variant="body1" sx={{ marginTop: 1, marginBottom: 1, marginRight: 1.5 }}>
            Try these examples:
          </Typography>
          {buttonExamples.map((example, index) => (
            <Button
              key={index}
              size="small"
              variant="outlined"
              onClick={() => handleButtonClick(example.label)}
              sx={{
                flex: 1,
                margin: '4px 6px',
                padding: '0px 0px',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                color: example.color,
                transition: '0.3s',
              }}
            >
              {example.label}
            </Button>
          ))}
        </Box>
      </Box>

      <Grid container spacing={3} justifyContent="center" sx={{ marginTop: 18 }}>
        <Grid item xs={12} md={4}>
          <PanelBox title="Monitoring" description="Dashboards and Reports" color="#18ba9b" buttons={monitoringButtonConfigs} />
        </Grid>
        <Grid item xs={12} md={4}>
          <PanelBox title="Integration" description="Submit and Edit Metadata" color="#ff8d6a" buttons={integrationButtonConfigs} />
        </Grid>
        <Grid item xs={12} md={4}>
          <PanelBox title="Coordination" description="Tools for Operators" color="#ff7e7e" buttons={coordinationButtonConfigs} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
