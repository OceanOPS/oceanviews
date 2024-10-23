import { Typography, Box, useTheme } from '@mui/material';

interface PanelBoxProps {
  title: string;
  description: string;
  color: 'primary' | 'secondary' | 'success';
}

const PanelBox: React.FC<PanelBoxProps> = ({ title, description, color }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        padding: '16px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: '0.3s',
        '&:hover': {
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 600,
          color: theme.palette[color].main,
        }}
      >
        {title}
      </Typography>
      <Typography variant="body1">{description}</Typography>
    </Box>
  );
};

export default PanelBox;
