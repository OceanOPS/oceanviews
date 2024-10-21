import React, { useState } from 'react';
import { Typography, Box } from '@mui/material';
import TopBar from './platforms/PlatformTopbar';

const ShipTable: React.FC = () => {
  const [selectionDescription, setSelectionDescription] = useState<string>('');

  const handleRightButtonAction = () => {
    // Define what the right button should do, e.g., open a dropdown or perform an action
    console.log('Right button clicked!');
  };

  const handleApplySelection = (description: string) => {
    setSelectionDescription(description);
    // Additional logic can be added here for what happens after selection is applied
  };

  const handleOpenModal = () => {
    // Logic to open the modal
    console.log("Modal opened");
  };

  return (
<Box sx={{ width: '100%', padding: '0px'}}> {/* Ensure full width here */}
	<TopBar
			rightButtonLabel="Add a Ship" // Customize this label
			rightButtonAction={handleRightButtonAction} // Define the action for this button
			selectionDescription={selectionDescription} // Pass the current selection description
			handleOpenModal={handleOpenModal}
		/>
	<Typography variant="h4">Ships</Typography>
	<Typography>Table of ship data will go here, with access to inspect details and to forms to submit data.</Typography>
</Box>
  );
};

export default ShipTable;
