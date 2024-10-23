import React from 'react';
import { IconButton, TableCell } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface TableActionsProps {
  row: any;
}

const TableActions: React.FC<TableActionsProps> = ({ row }) => {
  return (
    <TableCell>
      <IconButton sx={{ padding: '2px 6px' }} onClick={() => console.log('Inspect', row)}>
        <VisibilityIcon sx={{ padding: '2px' }} />
      </IconButton>
      <IconButton sx={{ padding: '2px 6px' }} onClick={() => console.log('Edit', row)}>
        <EditIcon sx={{ padding: '2px' }} />
      </IconButton>
      <IconButton sx={{ padding: '2px 6px' }} onClick={() => console.log('Delete', row)}>
        <DeleteIcon sx={{ padding: '2px' }} />
      </IconButton>
    </TableCell>
  );
};

export default TableActions;
