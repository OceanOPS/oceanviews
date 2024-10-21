import React, { useState, useEffect } from 'react';
import { AppBar, Box, Toolbar, Button, TextField, Checkbox, Typography, Dialog, DialogTitle, DialogContent, useTheme } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { PlatformFilters } from './platformFilters';
import AutocompleteField from '../../../toolshed/fields/AutocompleteField';
import CountryField from '../../../toolshed/fields/CountryField';

type FilterOption = {
  label: string;
  value: string;
};

const TopBar: React.FC = () => {
  const theme = useTheme();

  // State to manage which filters are visible
  const [filtersVisibility, setFiltersVisibility] = useState(() =>
    PlatformFilters.reduce((acc, filter) => {
      acc[filter.key] = filter.defaultDisplayed;
      return acc;
    }, {} as { [key: string]: boolean })
  );

  // State to manage filter values
  const [filters, setFilters] = useState<{ [key: string]: FilterOption[] }>({
    network: [],
    country: [],
  });

  // State to manage options fetched from the API
  const [filterOptions, setFilterOptions] = useState<{ [key: string]: FilterOption[] }>({});

  // Fetch options for Autocomplete filters based on filter URL
  const fetchOptions = async (filterKey: string, url: string) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      const options = data.data.map((item: any) => ({ label: item.name, value: item.id })); // Adjust this mapping based on your API response
      setFilterOptions((prev) => ({ ...prev, [filterKey]: options }));
    } catch (error) {
      console.error(`Error fetching options for ${filterKey}:`, error);
    }
  };

  // Handle fetching options when the component loads
  useEffect(() => {
    PlatformFilters.forEach((filter) => {
      if (filter.type === 'multiSelect' && filter.url) {
        fetchOptions(filter.key, filter.url); // Fetch options from API
      }
    });
  }, []);

  // Handle filter value changes
  const handleFilterChange = (filterKey: string, newValue: FilterOption[]) => {
    setFilters((prev) => ({
      ...prev,
      [filterKey]: newValue,
    }));
  };

  // State to manage modal visibility
  const [modalOpen, setModalOpen] = useState(false);

  // Toggles filter visibility
  const toggleFilterVisibility = (filterKey: string) => {
    setFiltersVisibility((prev) => ({
      ...prev,
      [filterKey]: !prev[filterKey],
    }));
  };

  // Opens/Closes the modal
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // Render only the filters that are visible
  const displayedFilters = PlatformFilters.filter((filter) => filtersVisibility[filter.key]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
        <Toolbar sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', alignItems: 'center', padding: '12px', margin: 0, gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2, flexGrow: 1 }}>
            {/* Render the filters dynamically based on visibility */}
            {displayedFilters.map((filter) => {
              switch (filter.type) {
                case 'text':
                  return (
                    <TextField
                      key={filter.key}
                      label={filter.label}
                      variant="outlined"
                      size="small"
                      sx={{
                        minWidth: '200px',
                        backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#000',
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#000',
                          color: theme.palette.text.primary,
                        },
                      }}
                    />
                  );
                case 'date':
                  return (
                    <DatePicker
                      key={filter.key}
                      label={filter.label}
                      value={null}
                      onChange={() => {}}
                      format="YYYY-MM-DD"
                      slotProps={{
                        textField: { size: 'small', sx: { 
                          backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#000',
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#000',
                            color: theme.palette.text.primary,
                          },
                        } },
                      }}
                    />
                  );
                case 'multiSelect':
                  return (
                    <AutocompleteField
                      key={filter.key}
                      label={filter.label}
                      url={filter.url}
                      value={filters[filter.key] || []}
                      onChange={(newValue) => handleFilterChange(filter.key, newValue)}
                    />
                  );
				case 'countrySelect':
					return (
					  <CountryField
						label="Country"
						url={filter.url}
						value={filters[filter.key] || []}
						onChange={(newValue) => handleFilterChange(filter.key, newValue)}
					  />
					);
                default:
                  return null;
              }
            })}

            {/* Add Filters Button */}
            <Button
              variant="contained"
              size="small"
              sx={{
                minWidth: '100px',
                height: '40px',
                textTransform: 'none',
              }}
              onClick={openModal}
            >
              More Filters
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

		{/* Modal for Adding More Filters */}
		<Dialog open={modalOpen} onClose={closeModal} maxWidth="lg" fullWidth>
			<DialogTitle>Select Filters</DialogTitle>
			<DialogContent sx={{ maxHeight: '90vh' }}> {/* Allowing the modal to take more height */}
				<Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}> {/* Increased gap between columns */}
				{/* Group filters by category */}
				{['General', 'Deployment', 'Ship', 'Identifiers', 'Hardware', 'Sensors'].map((category) => (
					<Box key={category} sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}> {/* Minimized vertical space between rows */}
					<Typography variant="subtitle2" sx={{ fontSize: '12px', fontWeight: 'bold', mb: 1 }}>
						{category}
					</Typography>
					{PlatformFilters.filter((filter) => filter.category === category).map((filter) => (
						<Box key={filter.key} sx={{ display: 'flex', alignItems: 'center', gap: 0, minWidth: '170px' }}> {/* Ensuring column can grow */}
						<Checkbox
							checked={filtersVisibility[filter.key]}
							onChange={() => toggleFilterVisibility(filter.key)}
							sx={{padding: '3px 10px'}}
						/>
						<Typography sx={{ whiteSpace: 'nowrap' }}>{filter.label}</Typography> {/* Prevent label from wrapping */}
						</Box>
					))}
					</Box>
				))}
				</Box>
			</DialogContent>
		</Dialog>


    </LocalizationProvider>
  );
};

export default TopBar;
