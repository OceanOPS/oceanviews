import React, { useState } from 'react';
import { Button, Toolbar, Box, Menu, MenuItem, Dialog, DialogTitle, DialogContent, Typography, IconButton, Tooltip } from '@mui/material';
import ColumnIcon from '@mui/icons-material/ViewColumn';
import AddIcon from '@mui/icons-material/Add';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface ToolbarActionsProps {
  entity: string;
  handleColumnDialogOpen: () => void;
  permalinkUrl: string;
}

const ToolbarActions: React.FC<ToolbarActionsProps> = ({ entity, handleColumnDialogOpen, permalinkUrl }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openModal, setOpenModal] = useState(false);
  const [copied, setCopied] = useState(false); // State for copy confirmation

  const handleExportClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handlePermalinkClick = () => {
    setOpenModal(true);
    handleCloseMenu();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(permalinkUrl);
    setCopied(true); 

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

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
          onClick={handleExportClick}
        >
          Export
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={handlePermalinkClick}>OceanJSON permalink</MenuItem>
        </Menu>
      </Box>

      {/* Modal for OceanJSON Permalink */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>OceanJSON Permalink</DialogTitle>
        <DialogContent>
          <Box display="flex" alignItems="center">
            <Typography variant="body1" sx={{ marginRight: 1 }}>
				{permalinkUrl.length > 70 ? `${permalinkUrl.slice(0, 70)}..... ` : permalinkUrl}
            </Typography>
            <Tooltip title={copied ? "Copied!" : "Copy to clipboard"}>
              <IconButton onClick={copyToClipboard} color="primary">
                {copied ? (
                  <CheckCircleIcon sx={{ color: 'green' }} />
                ) : (
                  <ContentCopyIcon />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </DialogContent>
      </Dialog>
    </Toolbar>
  );
};

export default ToolbarActions;
