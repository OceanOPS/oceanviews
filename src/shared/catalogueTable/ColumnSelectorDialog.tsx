import React from 'react';
import { Dialog, DialogTitle, DialogContent, FormGroup, FormControlLabel, Checkbox } from '@mui/material';

interface ColumnSelectorDialogProps {
  open: boolean;
  columns: { label: string; key: string; default: boolean }[];
  displayedColumns: string[];
  handleColumnToggle: (columnKey: string) => void;
  onClose: () => void;
}

const ColumnSelectorDialog: React.FC<ColumnSelectorDialogProps> = ({ open, columns, displayedColumns, handleColumnToggle, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Select Columns</DialogTitle>
      <DialogContent>
        <FormGroup>
          {columns.map((column) => (
            <FormControlLabel
              key={column.key}
              control={
                <Checkbox
                  checked={displayedColumns.includes(column.key)}
                  onChange={() => handleColumnToggle(column.key)}
                />
              }
              label={column.label}
            />
          ))}
        </FormGroup>
      </DialogContent>
    </Dialog>
  );
};

export default ColumnSelectorDialog;
