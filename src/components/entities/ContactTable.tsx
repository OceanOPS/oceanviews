// src/components/PlatformTable.tsx
import { Typography, Box } from '@mui/material';

const ContactTable: React.FC = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4">Contacts</Typography>
      <Typography>Table of contact data will go here, with access to inspect details and to forms to submit data.</Typography>
    </Box>
  );
};

export default ContactTable;
