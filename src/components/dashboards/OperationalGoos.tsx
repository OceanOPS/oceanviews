import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import PlatformTopbar from '../catalogue/platforms/PlatformTopbar';

const InteractiveMap: React.FC = () => {
  const [topBarHeight, setTopBarHeight] = useState<number>(72); 
  const topBarRef = useRef<HTMLDivElement | null>(null); 
  const iframeRef = useRef<HTMLIFrameElement | null>(null); 

  const [filters, setFilters] = useState<{ [key: string]: any }>({
    network: [],
    country: [],
  });

  const handleFilterChange = (filterKey: string, newValue: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: newValue,
    }));
  };

  useEffect(() => {
    const handleResize = () => {
      if (topBarRef.current) {
        setTopBarHeight(topBarRef.current.offsetHeight); 
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Box sx={{ width: '100%', 
		height: '100%', padding: '0px', display: 'flex', flexDirection: 'column' }}>
     
      <Box ref={topBarRef}>
        <PlatformTopbar  filters={filters} onFilterChange={handleFilterChange} />
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          overflow: 'hidden',
          height: `calc(100vh - ${topBarHeight}px)`, 
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
