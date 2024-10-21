// /src/toolshed/fields/CountryField.tsx

import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, Chip, Box, Avatar } from '@mui/material';
import { styled } from '@mui/system';

type CountryOption = {
  label: string;
  value: string;
  code2?: string; // To store the country code for fetching the flag
};

interface CountryFieldProps {
  label: string;
  url?: string;
  value: CountryOption[];
  onChange: (newValue: CountryOption[]) => void;
}

// Styled box to align flag and label
const OptionBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

const CountryField: React.FC<CountryFieldProps> = ({ label, url, value, onChange }) => {
  const [options, setOptions] = useState<CountryOption[]>([]);

  // Fetch country options from the provided URL
  const fetchOptions = async () => {
    if (url) {
      try {
        const response = await fetch(url);
        const data = await response.json();
        const fetchedOptions = data.data.map((item: any) => ({
          label: item.name,
          value: item.id,
          code2: item.code2, // Assuming the API returns a code2 for the country
        }));

        // Sort the fetched options alphabetically by the label (country name)
        const sortedOptions = fetchedOptions.sort((a: CountryOption, b: CountryOption) =>
          a.label.localeCompare(b.label)
        );

        setOptions(sortedOptions);
      } catch (error) {
        console.error(`Error fetching country options for ${label}:`, error);
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
      onChange={(event, newValue) => onChange(newValue as CountryOption[])}
      renderTags={(value: CountryOption[], getTagProps) =>
        value.map((option, index) => (
          <Chip
            label={option.label}
            avatar={<Avatar src={`https://www.ocean-ops.org/static/images/flags_iso/24/${option.code2}.png`} />}
            {...getTagProps({ index })}
          />
        ))
      }
      renderOption={(props, option) => (
        <li {...props}>
          <OptionBox>
            <Avatar
              sx={{ marginRight: '10px' }}
              src={`https://www.ocean-ops.org/static/images/flags_iso/24/${option.code2}.png`}
              alt={option.label}
            />
            {option.label}
          </OptionBox>
        </li>
      )}
      renderInput={(params) => (
        <TextField {...params} variant="outlined" label={label} />
      )}
    />
  );
};

export default CountryField;
