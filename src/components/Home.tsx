import { useState, useEffect, useRef } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import PanelBox from '../shared/PanelBox';  
import ChatBubble from '../shared/ChatBubble'; 
import CustomTextField from '../shared/inputs/LargeChatField'; 

const Home: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null); 
  const [messages, setMessages] = useState<{ content: string, side: 'left' | 'right' }[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && currentMessage.trim() !== '') {
      setMessages(prevMessages => [
        ...prevMessages,
        { content: currentMessage, side: 'right' }, 
        { content: "Our apologies, the AI chat functionality is not available quite yet. Stay tuned!", side: 'left' },
      ]);
      setCurrentMessage('');
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 2, textAlign: 'center', maxWidth: '1200px', margin: '0 auto' }}>
      <Grid item xs={12} md={4}>
        <Typography variant="h6" gutterBottom sx={{ whiteSpace: 'pre-line' }}>
          OceanViews is a free and open-source user interface.{"\n"} Focused on coordinating and monitoring the GOOS.{"\n"}
          Co-developed by over one hundred GOOS agencies.
        </Typography>
      </Grid>

      <Box sx={{ marginTop: 5 }}></Box>

      {/* Three horizontal panels */}
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={4}>
          <PanelBox title="Monitor" description="Create, manage and share customisable monitoring dashboards." color="primary" />
        </Grid>
        <Grid item xs={12} md={4}>
          <PanelBox title="Import" description="Submit metadata into the OceanAPI through user forms and file uploads." color="secondary" />
        </Grid>
        <Grid item xs={12} md={4}>
          <PanelBox title="Export" description="Export metadata in various formats and generate customized reports." color="success" />
        </Grid>
      </Grid>

      <Box sx={{ marginTop: 6 }}></Box>

      <Typography variant="h5" gutterBottom sx={{ marginTop: 4 }}>What can we help you with?</Typography>

      <Box sx={{ marginTop: 4, width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column' }}>
        {messages.map((message, index) => (
          <ChatBubble key={index} side={message.side}>
            {message.content}
          </ChatBubble>
        ))}
      </Box>
      
      <Box sx={{ marginTop: 2, width: '100%', maxWidth: '600px' }}>
        <CustomTextField
          placeholder="Message our AI here"
          value={currentMessage}
          inputRef={inputRef}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </Box>
    </Box>
  );
};

export default Home;
