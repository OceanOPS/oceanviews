import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { Responsive, WidthProvider } from 'react-grid-layout';
import PlatformTopbar from '../entities/platforms/PlatformTopbar'; 
import SummaryPieChart from '../widgets/SummaryPieChart'; 
import SummaryTable from '../widgets/SummaryTable'; 
import { useTheme } from '@mui/material';

// Wrap grid layout with WidthProvider for responsiveness
const ResponsiveGridLayout = WidthProvider(Responsive);

const Summary: React.FC = () => {
  const theme = useTheme(); 
  const [topBarHeight, setTopBarHeight] = useState<number>(72); // Default top bar height
  const topBarRef = useRef<HTMLDivElement | null>(null); // Ref to track the TopBar height
  
  // Layout for the grid
  const layout = [
    { i: 'table', x: 0, y: 1, w: 4, h: 6 },
    { i: 'chart', x: 4, y: 1, w: 8, h: 6 }, 
  ];

  // Define layouts for different breakpoints
  const layouts = { lg: layout }; // You can add more breakpoints if needed

  return (
    <Box sx={{ width: '100%', height: '100vh', padding: '0px', display: 'flex', flexDirection: 'column' }}>
      {/* TopBar with ref to calculate its height */}
      <Box ref={topBarRef}>
        <PlatformTopbar />
      </Box>

      {/* Main Content Area */}
      <Box
        sx={{
          flexGrow: 1,
          height: `calc(100vh - ${topBarHeight}px)`, 
          backgroundColor: theme.palette.mode === 'light' ? '#f5f5f5' : '#1c1c1e'
        }}
      >
        {/* Grid Layout */}
        <ResponsiveGridLayout
          className="layout"
          layouts={layouts} // Correctly passing layouts
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={50}
          isResizable={true}
          isDraggable={false}
          autoSize={true}
          compactType={null} // Prevent auto-compacting of the grid items
          preventCollision={true} // Prevent items from colliding or overflowing
        >
          {/* MUI Table */}
          <div key="table" style={{ padding: '10px', height: 'auto' }}>
            <Box
              sx={{
                backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#2c2c2e',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                padding: '16px',
                borderRadius: '8px',
              }}
            >
              <Typography variant="h6">Platform overview</Typography>
              <SummaryTable />
            </Box>
          </div>

          {/* AmCharts Chart */}
          <div key="chart" style={{ padding: '10px', height: 'auto' }}>
            <Box
              sx={{
                backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#2c2c2e',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                padding: '16px',
                borderRadius: '8px',
              }}
            >
              <Typography variant="h6">Platform distribution</Typography>
              <SummaryPieChart />
            </Box>
          </div>
        </ResponsiveGridLayout>
      </Box>
    </Box>
  );
};

export default Summary;
