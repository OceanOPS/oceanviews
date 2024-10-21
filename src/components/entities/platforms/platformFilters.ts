export const PlatformFilters = [
	{
	  key: 'reference',
	  label: 'Reference',
	  type: 'text',
	  category: 'General',
	  defaultDisplayed: true,
	},
	{
	  key: 'deployedAfter',
	  label: 'Deployed After',
	  type: 'date',
	  category: 'Deployment',
	  defaultDisplayed: true,
	},
	{
	  key: 'deployedBefore',
	  label: 'Deployed Before',
	  type: 'date',
	  category: 'Deployment',
	  defaultDisplayed: false,
	},
	{
	  key: 'network',
	  label: 'Network',
	  type: 'multiSelect',
	  category: 'General',
	  url: 'https://www.ocean-ops.org/api/data/network',
	  defaultDisplayed: true,
	},
	{
	  key: 'country',
	  label: 'Country',
	  type: 'countrySelect',
	  category: 'General',
	  url: 'https://www.ocean-ops.org/api/data/country', 
	  defaultDisplayed: true,
	},
	{
	  key: 'variable',
	  label: 'Variable',
	  type: 'multiSelect',
	  category: 'General',
	  url: 'https://www.ocean-ops.org/api/data/variable',
	  defaultDisplayed: true,
	},
	{
	  key: 'status',
	  label: 'Status',
	  type: 'multiSelect',
	  category: 'General',
	  url: 'https://www.ocean-ops.org/api/data/platformstatus', 
	  defaultDisplayed: true,
	},
	// Add more filters here...
  ];
  