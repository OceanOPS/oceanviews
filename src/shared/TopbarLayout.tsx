import React from 'react';
import { AppBar, Box, Toolbar, Button, useTheme } from '@mui/material';
import CustomTextField from './inputs/TextField';
import CustomNumberField from './inputs/NumberField';
import CustomDatePicker from './inputs/CustomDatePicker';
import MultiAutoField from './inputs/MultiAutoField';
import SingleAutoField from './inputs/SingleAutoField';
import CountryField from './inputs/CountryField';
import NetworkField from './inputs/NetworkField';

interface FilterOption {
  key: string;
  label: string;
  type: string;
  sortBy?: string;
  url?: string;
  min?: number;
  max?: number;
}

interface TopbarLayoutProps {
  onOpenModal: () => void;
  displayedFilters: FilterOption[];
  filters: { [key: string]: any };
  handleFilterChange: (filterKey: string, newValue: any) => void;
}

const TopbarLayout: React.FC<TopbarLayoutProps> = ({
  onOpenModal,
  displayedFilters,
  filters,
  handleFilterChange,
}) => {
  const theme = useTheme();

  

  return (
    <AppBar
      position="static"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        boxShadow: 'none',
        backgroundColor: theme.palette.mode === 'light' ? '#f5f5f5' : '#1c1c1e',
      }}
    >
      <Toolbar
        sx={{
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          padding: '12px',
          margin: 0,
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2, flexGrow: 1 }}>
          {displayedFilters.map((filter) => {
			const validSortBy = filter.sortBy === 'rank' || filter.sortBy === 'label' ? filter.sortBy : undefined;
            switch (filter.type) {
              case 'text':
                return (
				  <CustomTextField
					key={filter.key}
					label={filter.label}
					onBlur={(event) => handleFilterChange(filter.key, (event.target as HTMLInputElement).value)}
					onKeyDown={(event) => {
					  if (event.key === 'Enter') {
						handleFilterChange(filter.key, (event.target as HTMLInputElement).value);
					  }
					}}
				  />
                );
				case 'number':
				  return (
					<CustomNumberField
					  key={filter.key}
					  label={filter.label}
					  min={filter.min}
					  max={filter.max}
					  onBlur={(event) => handleFilterChange(filter.key, (event.target as HTMLInputElement).value)}
					  onKeyDown={(event) => {
						if (event.key === 'Enter') {
						  handleFilterChange(filter.key, (event.target as HTMLInputElement).value);
						}
					  }}
					/>
				  );
              case 'date':
                return (
                  <CustomDatePicker
                    key={filter.key}
                    label={filter.label}
                    value={null}
                    onChange={(newValue) => handleFilterChange(filter.key, new Date(newValue).toISOString().split('T')[0])}
                  />
                );
              case 'multiSelect':
                return (
                  <MultiAutoField
                    key={filter.key}
                    label={filter.label}
                    url={filter.url}
                    value={filters[filter.key] || []}
                    onChange={(newValue) => handleFilterChange(filter.key, newValue)}
                    sortBy={validSortBy || 'label'}
                  />
                );
				case 'singleSelect':
				  return (
					<SingleAutoField
					  key={filter.key}
					  label={filter.label}
					  url={filter.url}
					  value={filters[filter.key] || null}
					  onChange={(newValue) => handleFilterChange(filter.key, newValue)}
					  sortBy={validSortBy || 'label'}
					/>
				  );
              case 'countrySelect':
                return (
                  <CountryField
                    key={filter.key}
                    label="Country"
                    url={filter.url}
                    value={filters[filter.key] || []}
                    onChange={(newValue) => handleFilterChange(filter.key, newValue)}
                  />
                );
              case 'networkSelect':
                return (
                  <NetworkField
                    key={filter.key}
                    label="Network"
                    url={filter.url}
                    value={filters[filter.key] || []}
                    onChange={(newValue) => handleFilterChange(filter.key, newValue)}
                  />
                );
              default:
                return null;
            }
          })}
          <Button
            variant="contained"
            size="small"
            sx={{
              minWidth: '100px',
              height: '40px',
              textTransform: 'none',
            }}
            onClick={onOpenModal}
          >
            More Filters
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopbarLayout;
