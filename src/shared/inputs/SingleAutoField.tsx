import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';

type FilterOption = {
  label: string;
  value: string;
  rank?: number;
};

interface AutocompleteSingleFieldProps {
  label: string;
  url?: string;
  value: FilterOption | null;
  onChange: (newValue: FilterOption | null) => void;
  sortBy?: 'label' | 'rank';
}

const SingleAutoField: React.FC<AutocompleteSingleFieldProps> = ({
  label,
  url,
  value,
  onChange,
  sortBy = 'label',
}) => {
  const [options, setOptions] = useState<FilterOption[]>([]);

  const fetchOptions = async () => {
    if (url) {
      try {
        const response = await fetch(url);
        const data = await response.json();
        const fetchedOptions = data.data.map((item: any) => ({
          label: item.name,
          value: item.id,
          rank: item.rank,
        }));

        const sortedOptions = fetchedOptions.sort((a: FilterOption, b: FilterOption) => {
          if (sortBy === 'rank' && a.rank !== undefined && b.rank !== undefined) {
            return a.rank - b.rank;
          }
          return a.label.localeCompare(b.label);
        });

        setOptions(sortedOptions);
      } catch (error) {
        console.error(`Error fetching options for ${label}:`, error);
      }
    }
  };

  useEffect(() => {
    fetchOptions();
  }, [url, sortBy]);

  return (
    <Autocomplete
      size="small"
      sx={{
        minWidth: '200px',
        '& .MuiOutlinedInput-root': {
          backgroundColor: 'background.default',
          color: 'text.primary',
        },
      }}
      options={options}
      value={value}
      getOptionLabel={(option) => (option ? option.label : '')}
      onChange={(_event, newValue) => onChange(newValue as FilterOption | null)}
      renderInput={(params) => (
        <TextField {...params} variant="outlined" label={label} />
      )}
    />
  );
};

export default SingleAutoField;
