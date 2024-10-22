import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';

const SummaryTable: React.FC = () => {
  const rows = [
    { id: 1, key: 'Platform sample size', value: '8120' },
    { id: 2, key: 'Operational platforms', value: '100%' },
    { id: 3, key: 'Blacklisted', value: '0%' },
    { id: 4, key: 'Oldest platform', value: '15800 days' },
    { id: 5, key: 'Average age', value: '1903 days' },
    { id: 6, key: 'Median age', value: '1302 days' }
  ];

  return (
    <TableContainer 
      component={Paper} 
      sx={{
        boxShadow: 'none', // Remove shadow
        border: 'none',    // Remove border from the TableContainer
      }}
    >
      <Table 
        sx={{ 
          border: 'none', // Remove border from the Table
        }}
      >
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.key}</TableCell>
              <TableCell>{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SummaryTable;
