import { Typography, Box, Button, useTheme } from '@mui/material';

interface ButtonConfig {
  name: string;      // Button text
  icon: JSX.Element; // Icon as JSX
  onClick: () => void; // Click handler
}

interface PanelBoxProps {
  title: string;
  description: string;
  color: string;
  buttons: ButtonConfig[]; // New property for button configurations
}

const PanelBox: React.FC<PanelBoxProps> = ({ title, description, color, buttons }) => {
	const theme = useTheme();
	const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Box
      sx={{
        padding: '16px',
        border: 'none',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontFamily: 'Days One, sans-serif !important',
          fontWeight: 600,
          color: color,
        }}
      >
        {title}
      </Typography>
      <Typography variant="body1">{description}</Typography>

      <Box
        sx={{
        //   display: 'flex',
          justifyContent: 'space-between',
          marginTop: '8px',
        }}
      >
        {buttons.map((button, index) => (
          <Button
            key={index}
            className="icon-button"
            variant="outlined"
            onClick={button.onClick}
            sx={{
              flex: 1,
              margin: '8px 4px',
              padding: '6px 16px',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              color: color,
              transition: '0.3s',
			  backgroundColor: isDarkMode ? '#333333' : 'transparent',
              '&:hover': {
                backgroundColor: isDarkMode ? '#444444' : 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <span>{button.name}</span>
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default PanelBox;
