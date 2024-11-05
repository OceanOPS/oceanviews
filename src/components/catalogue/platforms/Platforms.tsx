import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import PlatformTopbar from './PlatformTopbar';
import PlatformTable from './PlatformTable';

const Platforms: React.FC = () => {
  const [topBarHeight, setTopBarHeight] = useState<number>(72);
  const topBarRef = useRef<HTMLDivElement | null>(null);

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
    <Box sx={{ width: '100%', height: 'calc(100vh - 64px)', padding: '0px', display: 'flex', flexDirection: 'column' }}>
      <Box ref={topBarRef}>
        <PlatformTopbar filters={filters} onFilterChange={handleFilterChange} />
      </Box>
      <Box sx={{ flexGrow: 1, overflow: 'auto', height: `calc(100vh - ${topBarHeight}px)` }}>
        <PlatformTable filters={filters} />
      </Box>
    </Box>
  );
};

export default Platforms;
