import { Paper, styled } from '@mui/material';

interface ChatBubbleProps {
  side: 'left' | 'right';
  children: React.ReactNode;
}

const ChatBubble = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'side',
})<{ side: 'left' | 'right' }>(({ theme, side }) => ({
  padding: '10px',
  borderRadius: '12px',
  maxWidth: '75%',
  marginBottom: '10px',
  alignSelf: side === 'right' ? 'flex-end' : 'flex-start',
  backgroundColor: side === 'right' ? theme.palette.primary.light : theme.palette.grey[300],
  color: side === 'right' ? theme.palette.primary.contrastText : theme.palette.text.primary,
}));

const ChatBubbleComponent: React.FC<ChatBubbleProps> = ({ side, children }) => {
  return <ChatBubble side={side}>{children}</ChatBubble>;
};

export default ChatBubbleComponent;
