// src/components/PlatformTable.tsx
import { Typography, Box } from '@mui/material';

const LineTable: React.FC = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4">Lines</Typography>
      <Typography>Table of line data will go here, with access to inspect details and to forms to submit data.</Typography>
    </Box>
  );
};

export default LineTable;
