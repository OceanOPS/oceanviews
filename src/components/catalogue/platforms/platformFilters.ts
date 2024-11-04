export const PlatformCategories = ['General', 'Deployment', 'Ship', 'Identifiers', 'Hardware', 'Sensors'];
import config from '../../../config';

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
	  type: 'networkSelect',
	  category: 'General',
	  url: `${config.oldDashboardApiRoot}/NetworkList?scope=theme&themeId=1000641`,
	  defaultDisplayed: true,
	},
	{
	  key: 'country',
	  label: 'Country',
	  type: 'countrySelect',
	  category: 'General',
	  url: `${config.apiRoot}/data/country?exp=["active = 1"]`, 
	  defaultDisplayed: true,
	},
	{
	  key: 'variable',
	  label: 'Variable',
	  type: 'multiSelect',
	  category: 'General',
	  url: `${config.apiRoot}/data/variable`,
	  defaultDisplayed: true,
	},
	{
	  key: 'status',
	  label: 'Status',
	  type: 'multiSelect',
	  category: 'General',
	  url: `${config.apiRoot}/data/platformstatus`, 
	  defaultDisplayed: true,
	  sortBy:'rank'
	},
	// Add more filters here...
  ];
