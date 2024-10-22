import { useState, useEffect, useRef } from 'react';
import { Typography, Box, TextField, Grid, useTheme, Paper } from '@mui/material'; // Added Paper for chat bubbles
import { styled } from '@mui/system';

const options = ['Monitoring dashboards', 'Import', 'Export', 'Help with metadata', 'Other queries']; // Example options for Autocomplete

// Custom styled Box for panels
const PanelBox = styled(Box)({
  padding: '16px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add shadow for a 3D effect
  transition: '0.3s',
  '&:hover': {
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Increase shadow on hover
  },
});

// Styled TextField without borders, rounded corners, and filled in grey
const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '38px', 
    backgroundColor: '#f0f0f0', 
    border: 'none', 
    padding: '10px 16px', 
    color: 'black', 
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none', // No border on the outline
  },
  '& .MuiInputBase-input::placeholder': {
    color: theme.palette.mode === 'dark' ? '#888' : '#aaa', // Darker placeholder in dark mode
    opacity: 1, // Ensure placeholder is fully visible
  },
}));

// Custom chat bubble style based on message side (left or right)
const ChatBubble = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'side', // Ignore the 'side' prop to pass only to styles
})<{ side: 'left' | 'right' }>(({ theme, side }) => ({
  padding: '10px',
  borderRadius: '12px',
  maxWidth: '75%',
  marginBottom: '10px',
  alignSelf: side === 'right' ? 'flex-end' : 'flex-start',
  backgroundColor: side === 'right' ? theme.palette.primary.light : theme.palette.grey[300],
  color: side === 'right' ? theme.palette.primary.contrastText : theme.palette.text.primary,
}));

const Home: React.FC = () => {
  const theme = useTheme(); // Access the theme for colors
  const inputRef = useRef<HTMLInputElement>(null); // Reference to the input field

  const [messages, setMessages] = useState<{ content: string, side: 'left' | 'right' }[]>([]); // Track chat messages
  const [currentMessage, setCurrentMessage] = useState('');

  useEffect(() => {
    // Automatically focus the text field when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && currentMessage.trim() !== '') {
      // When Enter is pressed, add user's message to the chat
      setMessages(prevMessages => [
        ...prevMessages,
        { content: currentMessage, side: 'right' }, // User's message on the right
        { content: "Our apologies, the GPT functionality is not available quite yet. Stay tuned!", side: 'left' }, // OceanViews' response
      ]);
      setCurrentMessage(''); // Clear input field
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',  // Full viewport height
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',  // Vertically centered
        alignItems: 'center',      // Horizontally centered
        padding: 2,
        textAlign: 'center',
        maxWidth: '1200px',  // Limit maximum width
        margin: '0 auto',    // Center horizontally
      }}
    >
      {/* Top paragraph */}
      <Grid item xs={12} md={4}>
        <Typography variant="h6" gutterBottom sx={{ whiteSpace: 'pre-line' }}>
          OceanViews is a free and open-source user interface.{"\n"} Focused on coordinating and monitoring the GOOS.{"\n"}
          Co-developed by over one hundred GOOS agencies.
        </Typography>
      </Grid>

      {/* Add a blank space */}
      <Box sx={{ marginTop: 5 }}></Box>

      {/* Three horizontal panels */}
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={4}>
          <PanelBox>
            <Typography
              variant="h6"
              sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, color: theme.palette.primary.main }} 
            >
              Monitor
            </Typography>
            <Typography variant="body1">
              Create, manage and share customisable monitoring dashboards.
            </Typography>
          </PanelBox>
        </Grid>
        <Grid item xs={12} md={4}>
          <PanelBox>
            <Typography
              variant="h6"
              sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, color: theme.palette.secondary.main }} 
            >
              Import
            </Typography>
            <Typography variant="body1">
              Submit metadata into the OceanAPI by user forms and file upload.
            </Typography>
          </PanelBox>
        </Grid>
        <Grid item xs={12} md={4}>
          <PanelBox>
            <Typography
              variant="h6"
              sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, color: theme.palette.success.main }} 
            >
              Export
            </Typography>
            <Typography variant="body1">
              Export metadata in various formats and generate customized reports.
            </Typography>
          </PanelBox>
        </Grid>
      </Grid>

      {/* Add a blank space  */}
      <Box sx={{ marginTop: 6 }}></Box>

      {/* Title */}
      <Typography variant="h5" gutterBottom sx={{ marginTop: 4 }}>
        What can we help you with?
      </Typography>


      {/* Chat Layout */}
      <Box sx={{ marginTop: 4, width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column' }}>
        {messages.map((message, index) => (
          <ChatBubble key={index} side={message.side}>
            {message.content}
          </ChatBubble>
        ))}
      </Box>
      
      {/* Large TextField for input */}
      <Box sx={{ marginTop: 2, width: '100%', maxWidth: '600px' }}>
        <CustomTextField
          variant="outlined"
          placeholder="Message our GPT here"
          fullWidth
          inputRef={inputRef} // Reference for auto-focus
          value={currentMessage} // Bind input value
          onChange={(e) => setCurrentMessage(e.target.value)} // Update input state
          onKeyPress={handleKeyPress} // Trigger message on Enter
        />
      </Box>

    </Box>
  );
};

export default Home;
