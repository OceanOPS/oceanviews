import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Select, MenuItem } from '@mui/material';

type FilteringModalProps = {
  open: boolean;
  onClose: () => void;
  handleFilter: (filters: { [key: string]: string[] }) => void;
};

const FilteringModal: React.FC<FilteringModalProps> = ({ open, onClose, handleFilter }) => {
  const [selectedFilters, setSelectedFilters] = React.useState<{ [key: string]: string[] }>({
    Basin: [],
    Variable: []
  });

  const handleAddFilter = () => {
    handleFilter(selectedFilters);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Add Filters</DialogTitle>
      <DialogContent>
        {/* Example for Basin filter */}
        <Select
          multiple
          value={selectedFilters.Basin}
          onChange={(e) => setSelectedFilters(prev => ({ ...prev, Basin: e.target.value as string[] }))}
          renderValue={(selected) => selected.join(', ')}
        >
          {['Atlantic', 'Pacific', 'Indian'].map((option) => (
            <MenuItem key={option} value={option}>{option}</MenuItem>
          ))}
        </Select>

        {/* Example for Variable filter */}
        <Select
          multiple
          value={selectedFilters.Variable}
          onChange={(e) => setSelectedFilters(prev => ({ ...prev, Variable: e.target.value as string[] }))}
          renderValue={(selected) => selected.join(', ')}
        >
          {['Temperature', 'Salinity'].map((option) => (
            <MenuItem key={option} value={option}>{option}</MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAddFilter} color="primary">Apply</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilteringModal;
