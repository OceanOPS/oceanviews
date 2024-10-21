// /src/toolshed/fields/AutocompleteField.tsx

import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, Chip } from '@mui/material';

type FilterOption = {
  label: string;
  value: string;
};

interface AutocompleteFieldProps {
  label: string;
  url?: string;
  value: FilterOption[];
  onChange: (newValue: FilterOption[]) => void;
}

const AutocompleteField: React.FC<AutocompleteFieldProps> = ({ label, url, value, onChange }) => {
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
          }))
          .sort((a: FilterOption, b: FilterOption) => a.label.localeCompare(b.label)); // Sort by label
        setOptions(fetchedOptions);
		} catch (error) {
		console.error(`Error fetching options for ${label}:`, error);
		}
	}
  };

  useEffect(() => {
    fetchOptions();
  }, [url]);

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
