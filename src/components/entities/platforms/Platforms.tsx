import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import PlatformTopbar from './PlatformTopbar';
import PlatformTable from './PlatformTable';

const Platforms: React.FC = () => {
  const [selectionDescription, setSelectionDescription] = useState<string>('');
  const [topBarHeight, setTopBarHeight] = useState<number>(72); // Default top bar height
  const topBarRef = useRef<HTMLDivElement | null>(null); // Ref to track the TopBar height

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

  const updateDataWithFilters = (filters: any) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach((filterKey) => {
      if (filters[filterKey] && filters[filterKey].length > 0) {
        params.append(filterKey, filters[filterKey].join(','));
      }
    });

    fetch(`/api/platforms?${params.toString()}`)
      .then((response) => response.json())
      .then((data) => {
        // Handle platform data refresh
      });
  };

  useEffect(() => {
    const handleResize = () => {
      if (topBarRef.current) {
        setTopBarHeight(topBarRef.current.offsetHeight); // Set TopBar height dynamically
      }
    };

    // Calculate height on initial load and on window resize
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Box sx={{ width: '100%', height: '100vh', padding: '0px', display: 'flex', flexDirection: 'column' }}>
      {/* TopBar with ref to calculate its height */}
      <Box ref={topBarRef}>
        <PlatformTopbar  />
      </Box>

      {/* PlatformTable adjusts its height dynamically based on TopBar's height */}
      <Box
        sx={{
          flexGrow: 1,
          overflow: 'auto', // Ensure the table is scrollable if it overflows
          height: `calc(100vh - ${topBarHeight}px)`, // Dynamic height adjustment
        }}
      >
        <PlatformTable />
      </Box>
    </Box>
  );
};

export default Platforms;
