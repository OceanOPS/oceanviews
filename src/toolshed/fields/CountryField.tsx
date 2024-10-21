import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, Chip, Box } from '@mui/material';
import { styled } from '@mui/system';

type CountryOption = {
  label: string;
  value: string;
  code2?: string;
};

interface CountryFieldProps {
  label: string;
  url?: string;
  value: CountryOption[];
  onChange: (newValue: CountryOption[]) => void;
}

const OptionBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

const CountryField: React.FC<CountryFieldProps> = ({ label, url, value, onChange }) => {
  const [options, setOptions] = useState<CountryOption[]>([]);

  const fetchOptions = async () => {
    if (url) {
      try {
        const response = await fetch(url);
        const data = await response.json();
        const fetchedOptions = data.data.map((item: any) => ({
          label: item.name,
          value: item.id,
          code2: item.code2, 
        }));

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
        minWidth: '240px',
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
            icon={
              <img
                src={`https://www.ocean-ops.org/static/images/flags_iso/24/${option.code2?.toLowerCase()}.png`}
                alt={option.label}
                style={{ width: '24px', height: '24px' }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            }
            {...getTagProps({ index })}
          />
        ))
      }
      
      renderOption={(props, option) => (
        <li {...props}>
          <OptionBox>
            <img
              src={`https://www.ocean-ops.org/static/images/flags_iso/24/${option.code2?.toLowerCase()}.png`}
              alt={option.label}
              style={{ marginRight: '10px', width: '24px', height: '24px' }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
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
