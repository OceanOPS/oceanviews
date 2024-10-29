import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { styled } from '@mui/system';

const OptionBox = styled('div')(({ rank }: { rank: number }) => ({
  paddingLeft: rank > 0 ? `${rank * 10}px` : '0px',
  fontWeight: rank === 0 ? 'bold' : 'normal',
}));

interface NetworkOption {
  label: string;
  value: string;
  masterprog?: string;
  rank?: number;
}

interface NetworkFieldProps {
  label: string;
  url?: string;
  value: NetworkOption[];
  onChange: (newValue: NetworkOption[]) => void;
}

const NetworkField: React.FC<NetworkFieldProps> = ({ label, url, value, onChange }) => {
  const [options, setOptions] = useState<NetworkOption[]>([]);

  const fetchOptions = async () => {
    if (url) {
      try {
        const response = await fetch(url);
        const data = await response.json();
        const fetchedOptions = Array.isArray(data) 
		? data.map((item: any) => ({
			label: item.name,
			value: item.id,
			rank: item.rank,
			masterprog: item.masterprog,
			}))
		: [];

        
        const sortNetworks = (a: NetworkOption, b: NetworkOption) => {
            const aMasterprog = a.masterprog ?? '';  
            const bMasterprog = b.masterprog ?? '';
            const aRank = a.rank ?? 0; 
            const bRank = b.rank ?? 0;
            const aName = a.label ?? ''; 
            const bName = b.label ?? '';
        
            if (aName === "OceanOPS") return -1;
            if (bName === "OceanOPS") return 1;
            if (aMasterprog === "OceanOPS") return -1;
            if (bMasterprog === "OceanOPS") return 1;
            if (aMasterprog === "zzz") return -1;
            if (bMasterprog === "zzz") return 1;
            if (aMasterprog > bMasterprog) return 1;
            if (aMasterprog < bMasterprog) return -1;
            if (aRank > bRank) return 1;
            if (aRank < bRank) return -1;
            if (aName > bName) return 1;
            if (aName < bName) return -1;
            return 0;
          };
          const sortedNetworks = fetchedOptions.sort(sortNetworks);
        setOptions(sortedNetworks);
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
      options={options}
	  size="small"
      sx={{
        minWidth: '260px',
        '& .MuiOutlinedInput-root': {
          backgroundColor: 'background.default',
          color: 'text.primary',
        },
        '& .MuiChip-root': {
          backgroundColor: 'action.selected',
          color: 'text.primary',
        },
      }}
      value={value}
      onChange={(event, newValue) => onChange(newValue as NetworkOption[])}
      getOptionLabel={(option: NetworkOption) => option.label}
      renderInput={(params) => (
        <TextField {...params} label={label} />
      )}
      renderOption={(props, option) => (
        <li {...props}>
          <OptionBox rank={option.rank ? option.rank : 0}>
            {option.label}
          </OptionBox>
        </li>
      )}
    />
  );
};

export default NetworkField;
