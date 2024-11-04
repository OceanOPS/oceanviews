import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, FormGroup, FormControlLabel, Checkbox, Box, Typography, IconButton } from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

interface Column {
  label: string;
  key: string;
  default: boolean;
  group?: string;
  noSorting?: boolean; // New property to control sorting
}

interface ColumnSelectorDialogProps {
  open: boolean;
  columns: Column[];
  displayedColumns: string[];
  handleColumnToggle: (columnKey: string) => void;
  onSortChange: (key: string, direction: 'asc' | 'desc' | null) => void;
  onClose: () => void;
}

const ColumnSelectorDialog: React.FC<ColumnSelectorDialogProps> = ({
  open,
  columns,
  displayedColumns,
  handleColumnToggle,
  onSortChange,
  onClose,
}) => {
  const [tempDisplayedColumns, setTempDisplayedColumns] = useState<string[]>(displayedColumns);
  const [tempSortFields, setTempSortFields] = useState<{ [key: string]: { direction: 'asc' | 'desc'; order: number } }>({});

  useEffect(() => {
    if (open) {
      setTempDisplayedColumns(displayedColumns);
      setTempSortFields({});
    }
  }, [open, displayedColumns]);

  const groupedColumns = columns.reduce((acc, column) => {
    const group = column.group || 'Ungrouped';
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(column);
    return acc;
  }, {} as Record<string, Column[]>);

  const toggleSortDirection = (key: string, direction: 'asc' | 'desc') => {
    if (!tempDisplayedColumns.includes(key)) {
      setTempDisplayedColumns((prev) => [...prev, key]);
    }

    setTempSortFields((prev) => {
      const currentSort = prev[key];

      if (!currentSort) {
        return { ...prev, [key]: { direction, order: Object.keys(prev).length + 1 } };
      } else if (currentSort.direction === direction) {
        const { [key]: _, ...remaining } = prev;
        return remaining;
      } else {
        return { ...prev, [key]: { ...currentSort, direction } };
      }
    });
  };

  const handleColumnToggleWithSortCheck = (columnKey: string) => {
    setTempDisplayedColumns((prev) =>
      prev.includes(columnKey) ? prev.filter((key) => key !== columnKey) : [...prev, columnKey]
    );

    if (tempSortFields[columnKey]) {
      setTempSortFields((prev) => {
        const { [columnKey]: _, ...remaining } = prev;
        return remaining;
      });
    }
  };

  const applyChanges = () => {
    displayedColumns.forEach((col) => {
      if (!tempDisplayedColumns.includes(col)) {
        handleColumnToggle(col);
      }
    });

    tempDisplayedColumns.forEach((col) => {
      if (!displayedColumns.includes(col)) {
        handleColumnToggle(col);
      }
    });

    Object.keys(tempSortFields).forEach((key) => {
      onSortChange(key, tempSortFields[key].direction);
    });

    onClose();
  };

  const sortedColumns = Object.keys(tempSortFields)
    .sort((a, b) => (tempSortFields[a].order || 0) - (tempSortFields[b].order || 0))
    .map((key) => ({ key, ...tempSortFields[key] }));

  return (
    <Dialog open={open} onClose={applyChanges} maxWidth="lg" fullWidth>
      <DialogTitle>Select Columns & Sorting Options</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, minWidth: 600 }}>
          {Object.keys(groupedColumns).map((group) => (
            <Box key={group} sx={{ minWidth: '170px' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                {group}
              </Typography>
              <FormGroup>
                {groupedColumns[group].map((column) => (
                  <Box key={column.key} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={tempDisplayedColumns.includes(column.key)}
                          onChange={() => handleColumnToggleWithSortCheck(column.key)}
                          sx={{ padding: '3px 10px' }}
                        />
                      }
                      label={column.label}
                    />
                    {!column.noSorting && (
                      <Box>
                        <IconButton
                          size="small"
                          onClick={() => toggleSortDirection(column.key, 'asc')}
                          sx={{
                            color: tempSortFields[column.key]?.direction === 'asc' ? 'primary.main' : '#bbb',
                            fontSize: '0.8rem',
                          }}
                        >
                          <ArrowUpward fontSize="inherit" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => toggleSortDirection(column.key, 'desc')}
                          sx={{
                            color: tempSortFields[column.key]?.direction === 'desc' ? 'primary.main' : '#bbb',
                            fontSize: '0.8rem',
                          }}
                        >
                          <ArrowDownward fontSize="inherit" />
                        </IconButton>
                      </Box>
                    )}
                  </Box>
                ))}
              </FormGroup>
            </Box>
          ))}
        </Box>

        <Typography variant="h6" sx={{ marginTop: 3 }}>Sort Order Preview</Typography>
        <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
          {sortedColumns.length === 0 ? (
            <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
              No sorting options selected. Click on arrows to sort.
            </Typography>
          ) : (
            sortedColumns.map((sortCol, index) => (
              <Box key={sortCol.key} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography>{index + 1}.</Typography>
                <Typography>{columns.find(col => col.key === sortCol.key)?.label || sortCol.key}</Typography>
                <Typography>{sortCol.direction === 'asc' ? 'Ascending' : 'Descending'}</Typography>
              </Box>
            ))
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ColumnSelectorDialog;
