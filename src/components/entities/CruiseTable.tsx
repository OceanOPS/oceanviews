// src/components/PlatformTable.tsx
import { Typography, Box } from '@mui/material';

const CruiseTable: React.FC = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4">Cruises</Typography>
      <Typography>Table of cruise data will go here, with access to inspect details and to forms to submit data.</Typography>
    </Box>
  );
};

export default CruiseTable;
