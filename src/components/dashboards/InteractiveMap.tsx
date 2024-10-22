import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import PlatformTopbar from '../entities/platforms/PlatformTopbar';

const InteractiveMap: React.FC = () => {
  const [topBarHeight, setTopBarHeight] = useState<number>(72); // Default top bar height
  const topBarRef = useRef<HTMLDivElement | null>(null); // Ref to track the TopBar height
  const iframeRef = useRef<HTMLIFrameElement | null>(null); // Keep iframe reference

  // Resize the top bar dynamically
  useEffect(() => {
    const handleResize = () => {
      if (topBarRef.current) {
        setTopBarHeight(topBarRef.current.offsetHeight); // Set TopBar height dynamically
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Box sx={{ width: '100%', height: '100vh', padding: '0px', display: 'flex', flexDirection: 'column' }}>
      {/* TopBar with ref to calculate its height */}
      <Box ref={topBarRef}>
        <PlatformTopbar />
      </Box>

      {/* Iframe for the map, keeps state in memory */}
      <Box
        sx={{
          flexGrow: 1,
          overflow: 'hidden', // Ensure iframe doesn't overflow
          height: `calc(100vh - ${topBarHeight}px)`, // Dynamic height adjustment
        }}
      >
        <iframe
          ref={iframeRef}
          src="https://www.ocean-ops.org/maps/interactive/index.html?theme=all&basemap=basemapOceansNoLabel&extent=[-55,28,35,66]"
          title="OceanOps Interactive Map"
          width="100%"
          height="100%"
          style={{ border: 'none' }}
        ></iframe>
      </Box>
    </Box>
  );
};

export default React.memo(InteractiveMap);
