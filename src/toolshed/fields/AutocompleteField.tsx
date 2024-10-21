import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, Chip } from '@mui/material';

type FilterOption = {
  label: string;
  value: string;
  rank?: number;  // Optional rank field for sorting
};

interface AutocompleteFieldProps {
  label: string;
  url?: string;
  value: FilterOption[];
  onChange: (newValue: FilterOption[]) => void;
  sortBy?: 'label' | 'rank';  // Optional sortBy prop (either 'label' or 'rank')
}

const AutocompleteField: React.FC<AutocompleteFieldProps> = ({ label, url, value, onChange, sortBy = 'label' }) => {
  const [options, setOptions] = useState<FilterOption[]>([]);

  // Fetch options from the provided URL
  const fetchOptions = async () => {
    if (url) {
      try {
        const response = await fetch(url);
        const data = await response.json();
        const fetchedOptions = data.data.map((item: any) => ({
          label: item.name,
          value: item.id,
          rank: item.rank,  // Include rank for sorting if needed
        }));

        const sortedOptions = fetchedOptions.sort((a: FilterOption, b: FilterOption) => {
          if (sortBy === 'rank' && a.rank !== undefined && b.rank !== undefined) {
            return a.rank - b.rank;  // Sort by rank
          }
          return a.label.localeCompare(b.label);  // Default sort by label
        });

        setOptions(sortedOptions);
      } catch (error) {
        console.error(`Error fetching options for ${label}:`, error);
      }
    }
  };

  useEffect(() => {
    fetchOptions();
  }, [url, sortBy]);  // Re-fetch data when url or sortBy changes

  return (
    <Autocomplete
      multiple
      size="small"
      sx={{
        minWidth: '200px',
        '& .MuiOutlinedInput-root': {
          backgroundColor: 'background.default',
          color: 'text.primary',
        },
        '& .MuiChip-root': {
          backgroundColor: 'action.selected',
          color: 'text.primary',
        },
      }}
      options={options}
      value={value}
      getOptionLabel={(option) => option.label}
      onChange={(event, newValue) => onChange(newValue as FilterOption[])}
      renderTags={(value: FilterOption[], getTagProps) =>
        value.map((option, index) => (
          <Chip label={option.label} {...getTagProps({ index })} />
        ))
      }
      renderInput={(params) => (
        <TextField {...params} variant="outlined" label={label} />
      )}
    />
  );
};

export default AutocompleteField;
