import React, { useState, useEffect } from 'react';
import { Box, TextField, MenuItem, useTheme } from '@mui/material';

const SummaryPieChart: React.FC = () => {
  const theme = useTheme();
  const [chart, setChart] = useState<any>(null); 
  const [groupBy, setGroupBy] = useState<string>('Status'); 
  const [data, setData] = useState<any[]>([]); 

  const groupByOptions = ['Status', 'Country', 'Network', 'Program', 'Model', 'Telecom type'];

  const getFakeData = (groupBy: string) => {
    switch (groupBy) {
      case 'Status':
        return [
          { section: 'Active', count: 80, color: '#67b7dc' },
          { section: 'Inactive', count: 20, color: '#fdd400' },
          { section: 'Closed', count: 5, color: '#f45b5b' },
        ];
      case 'Country':
        return [
          { section: 'USA', count: 40, color: '#84b761' },
          { section: 'France', count: 30, color: '#cc4748' },
          { section: 'Japan', count: 10, color: '#67b7dc' },
          { section: 'Australia', count: 20, color: '#fdd400' },
        ];
      case 'Network':
        return [
          { section: 'Argo', count: 50, color: '#67b7dc' },
          { section: 'GO-SHIP', count: 30, color: '#fdd400' },
          { section: 'OceanSITES', count: 10, color: '#f45b5b' },
        ];
      case 'Program':
        return [
          { section: 'Program A', count: 60, color: '#84b761' },
          { section: 'Program B', count: 20, color: '#cc4748' },
          { section: 'Program C', count: 20, color: '#fdd400' },
        ];
      case 'Model':
        return [
          { section: 'Model X', count: 70, color: '#67b7dc' },
          { section: 'Model Y', count: 30, color: '#f45b5b' },
        ];
      case 'Telecom type':
        return [
          { section: 'Iridium', count: 60, color: '#67b7dc' },
          { section: 'Argos', count: 40, color: '#fdd400' },
        ];
      default:
        return [];
    }
  };

  const fetchData = (groupBy: string) => {
    const fakeData = getFakeData(groupBy);
    setData(fakeData);
  };

  useEffect(() => {
    fetchData(groupBy);
  }, [groupBy]);

  useEffect(() => {
    if (data.length > 0) {
      const chartConfig = {
        type: 'pie',
        theme: theme.palette.mode === 'light' ? 'light' : 'dark',
        dataProvider: data,
        valueField: 'count',
        titleField: 'section',
        colorField: 'color',
        innerRadius: '30%',
        labelsEnabled: true,
        startDuration: 0,
        outlineThickness: 0.7,
        hideLabelsPercent: 1.7,
        legend: {
          position: 'bottom',
          valueText: '',
          align: 'center',
          markerType: 'circle',
        },
        autoMargins: false, 
        marginTop: 10, 
        marginBottom: 10, 
        marginLeft: 10, 
        marginRight: 10, 
        pullOutRadius: '5%', 
        labelRadius: 15,
        fontSize: 14,
        export: {
          enabled: true,
        },
      };

      const chartInstance = window.AmCharts.makeChart('chartdiv', chartConfig);

      setChart(chartInstance); // Store the chart instance

      return () => {
        if (chartInstance) {
          chartInstance.clear(); // Clean up on unmount
        }
      };
    }
  }, [data, theme]);

  return (
    <Box>
      <TextField
        select
        size='small'
        label="Group By"
        value={groupBy}
        onChange={(e) => setGroupBy(e.target.value)}
        variant="outlined"
        sx={{ marginBottom: 0, width: 300,marginTop: 2, }}
      >
        {groupByOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      <Box id="chartdiv" sx={{ width: '100%', height: '600px' }}></Box>
    </Box>
  );
};

export default SummaryPieChart;
