import React from 'react';
import { Dialog, DialogTitle, DialogContent, Box, Typography, Checkbox } from '@mui/material';

interface FilterOption {
  key: string;
  label: string;
  category: string;
}

interface FilterDialogProps {
  open: boolean;
  onClose: () => void;
  filtersVisibility: { [key: string]: boolean };
  toggleFilterVisibility: (key: string) => void;
  filters: FilterOption[]; 
  categories: string[]; 
}

const FilterDialog: React.FC<FilterDialogProps> = ({
  open,
  onClose,
  filtersVisibility,
  toggleFilterVisibility,
  filters,
  categories,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Select Filters</DialogTitle>
      <DialogContent sx={{ maxHeight: '90vh' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
          {categories.map((category) => (
            <Box key={category} sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              <Typography variant="subtitle2" sx={{ fontSize: '12px', fontWeight: 'bold', mb: 1 }}>
                {category}
              </Typography>
              {filters.filter((filter) => filter.category === category).map((filter) => (
                <Box key={filter.key} sx={{ display: 'flex', alignItems: 'center', gap: 0, minWidth: '170px' }}>
                  <Checkbox
                    checked={filtersVisibility[filter.key]}
                    onChange={() => toggleFilterVisibility(filter.key)}
                    sx={{ padding: '3px 10px' }}
                  />
                  <Typography sx={{ whiteSpace: 'nowrap' }}>{filter.label}</Typography>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default FilterDialog;
