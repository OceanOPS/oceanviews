import React from 'react';
import { Typography, Box } from '@mui/material';

const ShipTable: React.FC = () => {

  return (
<Box sx={{ width: '100%', padding: '0px'}}> 
	
	<Typography variant="h4">Ships</Typography>
	<Typography>Table of ship data will go here, with access to inspect details and to forms to submit data.</Typography>
</Box>
  );
};

export default ShipTable;
