import React from 'react';
import { Button, Toolbar, Box } from '@mui/material';
import ColumnIcon from '@mui/icons-material/ViewColumn';
import AddIcon from '@mui/icons-material/Add';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

interface ToolbarActionsProps {
  entity: string;
  handleColumnDialogOpen: () => void;
}

const ToolbarActions: React.FC<ToolbarActionsProps> = ({ entity, handleColumnDialogOpen }) => {
  return (
    <Toolbar sx={{ justifyContent: 'space-between' }}>
      <Box>
        <Button
          variant="contained"
          color="info"
          startIcon={<ColumnIcon />}
          sx={{ marginRight: '8px' }}
          onClick={handleColumnDialogOpen}
        >
          Select columns
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{ marginRight: '8px' }}
          onClick={() => console.log(`Add ${entity}`)}
        >
          Add {entity}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<FileDownloadIcon />}
          onClick={() => console.log('Export data')}
        >
          Export
        </Button>
      </Box>
    </Toolbar>
  );
};

export default ToolbarActions;
