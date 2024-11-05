

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! FIELDS FROM OLD OCEANOPS DASHBOARD TO CONVERT INTO platformFilters.tsx !!!!!!!!!!!!!!!!!!!!!!!!!!!

// FIELDS ARRAY: Each object is a field available in Ptf Query form

// PARAMETERS:
// label: displayed text in table
// extraLabel: text will be added after label
// altLabel: text will be displayed in filter tab in top summary
// section: name of section/category of field in platform query dropdown list menu
// type: html input type or 'single'/'multi' for select boxes
// url: URL of service to populate options in select boxes
// idField/textField: names of value/display properties in json response to populate options
// optFooter/optFooterBis/optBisTitle/optBis/optMore: names of properties for extra display in json response to populate options
// adminOnly: available only if user has admin rights
// hidden: array of themes to make field unavailable
// shownOnly: array of themes necessary to make field available
// adjustWidth: in field groups within a row - amount of pixels to add (remove if negative) from avergae width (100% / nb fields) : so the sum of adjust values in a row should equal zero
// labelWidth: full width in px of label instead of default 160px
// min / max: limit values in number inputs
 
	var DataSectionInfoPopover = '<a class="info-btn" data-html="true" data-toggle="popover" data-trigger="hover" '+
	'title="Data section" data-placement="right" data-content="Filter '+ VOCAB["PTF"].toLowerCase() + 
	's by observations they have taken (only searches for observations from the last 30 days">'+
  	'<i style="margin-left: 0.6em; margin-top: 0em; color: #4db0fb;" class="fa fa-info"></i></a>';
	
	if(THEME.name == 'Argo'){
		DataSectionInfoPopover = '<a class="info-btn" data-html="true" data-toggle="popover" data-trigger="hover" '+
		'title="Data section" data-placement="right" data-content="Criteria in this section filters both floats and observations samples. '+
		'The observations will be limited to only those taken by the float sample that also meet the chosen criteria.">'+
	  	'<i style="margin-left: 0.6em; margin-top: 0em; color: #4db0fb;" class="fa fa-info"></i></a>';
	}

	var ObsStandbyInfoPopover = '<a class="info-btn" data-html="true" data-toggle="popover" data-trigger="hover" '+
	'title="Standby observation" data-placement="right" data-content="Filter '+ VOCAB["PTF"].toLowerCase() + 
	's by standby observations they have taken (observations for which at least one variable measurement corresponds to all criteria in this section, i.e. minimum age and selected variables). The observations will also be filtered to only those mathching these criteria. The Exclude Adjusted checkbox allows to not consider measurements with an ADJUSTED status as standby observations.">'+
  	'<i style="margin-left: 0.6em; margin-top: 0em; color: #4db0fb;" class="fa fa-info"></i></a>';
	
	var PtfStatusInfoPopover = '<a class="info-btn" data-html="true" data-toggle="popover" data-trigger="hover" title="Status" '+
	'data-placement="right" data-content="<div class=\'own-class\'><span style=\'font-size: 12px; width: 450px !important;\'>'+
	'Tag automatically defined by the system based on metadata completion and end user data avalaibility. See individual status definition for more details.</span></div>' +
	'"><i style=\'margin-left: 0.6em; margin-top: 0em; color: #4db0fb;\' class=\'fa fa-info\'></i></a>';
	
	PtfSelectorFieldConfig = [
		
				// GENERAL

				{
					label: 'Observing networks',
					extraLabel: '<a class="info-btn" target="_blank" href="https://trello.com/c/6Zqn0Vdf/7-network" title="Display network definition in new tab">'+
			      	'<i style="margin-left: 0.6em; margin-top: 0em; color: #4db0fb;" class="fa fa-info"></i></a>',
					section: 'General',
					type: 'multi',
					textField: 'name',
					value: (THEME.name != 'OceanOPS' ? [{text: THEME.name, id: THEME.id}] : null),
					id: 'masterNetworks',
					url: urlPtfMasterNetworks,
					help: 'Select one or more observing networks',
					optionsDescriptions: true,
					disabled: THEME.name != 'OceanOPS'
				},
				
				{
					label: 'Water depth (minimal value)',
					shownOnly: ['OceanSITES', 'OceanOPS'],
					section: 'General',
					type: 'number',
					id: 'minimumMaxMooringDepth',
					labelWidth: 161,
					extraLabel: '<a class="info-btn" data-html="true" data-toggle="popover" data-trigger="hover" '+
					'title="Water depth" data-placement="right" data-content="The water depth corresponds to the amount of meters '+
					'below sea level available for mooring. Enter a value in both minimal and maximal fields to define a range or for instance type 2000 in the minimal value field to select all Deep T/S platforms."><i style="margin-left: 0.6em; margin-top: 0em; color: #4db0fb;" class="fa fa-info"></i></a>',
					groupId: 'maxMooringDepth'
				},
				{
					label: 'Water depth (maximal value)',
					shownOnly: ['OceanSITES', 'OceanOPS'],
					section: 'General',
					type: 'number',
					id: 'maximumMaxMooringDepth',
					groupId: 'maxMooringDepth'
				},
				{
					label: 'Program',
					extraLabel: '<a class="info-btn" data-html="true" data-toggle="popover" data-trigger="hover" '+
					'title="Program" data-placement="right" data-content="'+ (THEME.name == 'SOT' ? "Disabled here. Please use the field at the top of form." : "Options are filtered by countries if any have been selected") + '">' +
			      	'<i style="margin-left: 0.6em; margin-top: 0em; color: #4db0fb;" class="fa fa-info"></i></a>',
					type: 'multi',
					textField: 'name',
					id: 'programs',
					section: 'General',
				//	url: (THEME.name == 'OceanSITES' ? urlPtfOsProgram : urlProgram),
					url: urlProgram,
			    	extraField: 'masterProg',
				    optFooter: 'countryName',
				    disabled: THEME.name == 'SOT',
					help: (THEME.name == 'SOT' ? "Disabled here. Please use the field above." : 'Select one or more programs implementing and operating the '+ VOCAB["PTF"].toLowerCase())
				},
				{
					label: 'Sensor Provider Program',
					type: 'multi',
					textField: 'name',
					id: 'sensorProviderPrograms',
					section: 'General',
					url: urlSensorProviderProgram,
			    	extraField: 'masterProg',
				    optFooter: 'countryName',
				    disabled: THEME.name == 'SOT',
					help: (THEME.name == 'SOT' ? "Disabled here. Please use the field above." : 'Select one or more programs providing/funding sensors on the '+ VOCAB["PTF"].toLowerCase())
				},
				{
					label: 'Agencies',
					extraLabel: '<a class="info-btn" data-html="true" data-toggle="popover" data-trigger="hover" '+
					'title="Program agencies" data-placement="right" data-content="Filter the platforms through with their program\'s affiliated agencies">'+
			      	'<i style="margin-left: 0.6em; margin-top: 0em; color: #4db0fb;" class="fa fa-info"></i></a>',
					type: 'multi',
					textField: 'name',
					id: 'programsAgency',
					section: 'General',
					url: urlProgAgencies,
					help: 'Select one or more agencies affiliated to the platform\'s program',
					adjustWidth: 150,
					labelWidth: 168,
					hidden: ['SOT'],
					groupId: 'agencies'
				},	
				{
					label: 'Contacts',
					extraLabel: '<a class="info-btn" data-html="true" data-toggle="popover" data-trigger="hover" '+
					'title="Contact" data-placement="right" data-content="Filter the platforms by affiliated contacts with any role. You can also select one or more roles to filter even further by reducing the query to the selected contacts with the selected roles.">'+
			      	'<i style="margin-left: 0.6em; margin-top: 0em; color: #4db0fb;" class="fa fa-info"></i></a>',
					type: 'multi',
					textField: 'name',
					idField: 'stringitemid', 
					id: 'contacts',
					section: 'General',
					url: urlSearchFilteredContacts + "?allIfNoFilter=",
					help: 'Select one or more contacts affiliated to the platform',
					adjustWidth: 50,
					hidden: ['SOT'],
					groupId: 'contacts'
				},	
				{
					label: 'Roles',
					altLabel: 'Contact roles',
					type: 'multi',
					textField: 'name',
					id: 'contactRoles',
					section: 'General',
					url: urlQueryContactRole,
					help: 'Select one or more roles for the contact affiliated to the platform',
					adjustWidth: -50,
					labelWidth: 50,
					hidden: ['SOT'],
					groupId: 'contacts'
				},	
				{
					type: 'checkbox',
					id: 'isPogoMember',
					label: 'POGO members',
					altLabel: 'Is a POGO member',
					section: 'General',
					adjustWidth: -150,
					labelWidth: 110,
					defaultValue: null,
					hidden: ['SOT'],
					groupId: 'agencies'
				},
				{
					id: 'owner',
					label: 'Owning agency',
					section: 'General',
					type: 'single',
					textField: 'nameShort',
					optFooter: 'name',
					optFooterBis: 'countryName',
					url: urlSearchFilteredAgencies,
					shownOnly: ['OceanGliders', 'OceanOPS'],
					placeholder: 'Type in here an agency name', 
				    idField: 'stringitemid', 
				    textField: 'nameShort',
				    remoteFilter: true,
				    template: true, 
					help: 'Select the owner of the glider'
				},
				{
					label: (THEME.name == 'SOT' ? 'Additional programs' : 'Networks'),
					extraLabel: '<a class="info-btn" target="_blank" href="https://trello.com/c/6Zqn0Vdf/7-network" title="Display network definition in new tab">'+
			      	'<i style="margin-left: 0.6em; margin-top: 0em; color: #4db0fb;" class="fa fa-info"></i></a>',
					section: 'General',
					type: 'multi',
					textField: 'name',
					id: 'networks',
					hidden: ['AtlantOS'],
					url: urlRegNetwork,
					help: 'Select one or more networks',
					optionsDescriptions: true
				},
				{
					label: 'Class-Category',
					extraLabel: '<a class="info-btn" data-html="true" data-toggle="popover" data-trigger="hover" '+
					'title="Program" data-placement="right" data-content="Disabled here. Please use the field at the top of form.">' +
			      	'<i style="margin-left: 0.6em; margin-top: 0em; color: #4db0fb;" class="fa fa-info"></i></a>',
					section: 'Station',
					type: 'multi',
					textField: 'name',
	        		id: 'classCategory',
					url: urlRegClassCategories,
					optionsDescriptions: true,
					shownOnly: ['SOT','OceanOPS'],
				    disabled: THEME.name == 'SOT',
					help: (THEME.name == 'SOT' ? "Disabled here. Please use the field above." : 'Select one or more class-categories')
				},
	        	{
	        		label: 'Area of operation',
					extraLabel: '<a class="info-btn" data-html="true" data-toggle="popover" data-trigger="hover" '+
					'title="Program" data-placement="right" data-content="Disabled here. Please use the field at the top of form.">' +
			      	'<i style="margin-left: 0.6em; margin-top: 0em; color: #4db0fb;" class="fa fa-info"></i></a>',
					section: 'Station',
					type: 'multi',
					textField: 'name',
	        		id: 'area',
					shownOnly: ['SOT','OceanOPS'],
				    disabled: THEME.name == 'SOT',
	        		url: urlCruiseLines,
	        		help: (THEME.name == 'SOT' ? "Disabled here. Please use the field above." : "")
	        	},
				{
					label: 'Exclude networks',
					extraLabel: '<a class="info-btn" target="_blank" href="https://trello.com/c/6Zqn0Vdf/7-network" title="Display network definition in new tab">'+
			      	'<i style="margin-left: 0.6em; margin-top: 0em; color: #4db0fb;" class="fa fa-info"></i></a>',
					section: 'General',
					type: 'multi',
					textField: 'name',
					id: 'excludeNetworks',
					url: urlRegNetwork,
					help: 'Exclude one or more networks from search results',
					optionsDescriptions: true
				},
				{
					label: 'Family',
					section: 'General',
					type: 'multi',
					textField: 'name',
					id: 'family',
					url: urlFamily,
					adjustWidth: 50,
					hidden: ['SOT'],
					groupId: 'ptfFamilyType'
				},
				{
					label: 'Type',
					section: 'General',
					type: 'multi',
					textField: 'name',
					id: 'modelType',
					url: urlModelType,
					labelWidth: (THEME.name == 'SOT' ? null : 50),
					adjustWidth: (THEME.name == 'SOT' ?  null : -50),
					groupId: (THEME.name == 'SOT' ?  'modelType' : 'ptfFamilyType')
				},
				{
					label:  (THEME.name == 'SOT' ? 'Main device'  : 'Model'),
					extraLabel: '<a class="info-btn" style="cursor: pointer;" target="_blank" '+
					'onclick="new MyDesktop.PtfModelTrees().createWindow();" title="Open models explorer for details">'+
			      	'<i style="margin-left: 0.6em; margin-top: 0em; color: #4db0fb;" class="fa fa-info"></i></a>',
					section: 'General',
					type: 'multi',
					textField: 'name',
					id: 'model',
					optFooter: 'typeName',
					optFooterBis: 'masterProg',
					url: urlModel
				},
				{
					label: 'Age minimum (days)',
					section: 'General',
					type: 'number',
					id: 'ageMin',
					labelWidth: 161,
					hidden: ['SOT'],
					extraLabel: '<a class="info-btn" data-html="true" data-toggle="popover" data-trigger="hover" '+
					'title="Age" data-placement="right" data-content="The age corresponds to the number of days '+
					'between the deployment and the last localisation. A platform stops aging after it\'s last observation '+
					'(eg. selecting a minimum age of 100 will select all platforms that lasted more than 99 days - '+
					'whether they are still operational or not)"><i style="margin-left: 0.6em; margin-top: 0em; color: #4db0fb;" class="fa fa-info"></i></a>',
					groupId: 'age'
				},
				{
					label: 'Age maximum (days)',
					section: 'General',
					type: 'number',
					id: 'ageMax',
					hidden: ['SOT'],
					groupId: 'age'
				},
				{
					label: 'Batch reference',
					section: 'General',
					type: 'text',
					id: 'batchRef',
					hidden: ['SOT'],
					groupId: 'batch'
				},
				{
					label: 'Batch status',
					section: 'General',
					type: 'single',
					id: 'batchStatus',
					hidden: ['SOT'],
					textField: 'name',
					url: urlBatchStatuses,
					groupId: 'batch'
				},
				{
					label: 'Ending cause',
					type: 'multi',
					textField: 'name',
					id: 'endingCause',
					section: 'General',
					blankOption: true,
					hidden: ['SOT'],
					url: urlGetAllEndingCauses
				},
				{
					label: 'Site name',
					type: 'multi',
					textField: 'name',
					id: 'siteNames',
					section: 'General',
					hidden: ['SOT'],
					url: urlQueryPtfSites
				},
				{
					label: 'Is the latest deployment<br>for the GTS-ID',
					altLabel: 'Latest deployment',
					type: 'checkbox',
					textField: 'name',
					id: 'sitesLatest',
					section: 'General',
				    disabled: THEME.name == 'SOT',
					shownOnly: ['OceanSITES','OceanGliders','OceanOPS'],
					extraLabel: '<a class="info-btn" data-html="true" data-toggle="popover" data-trigger="hover" '+
					'title="Latest deployment" data-placement="right" data-content="Only return the latest platform to have been deployed for a given GTS-ID. '+
					'This concerns cases where the GTS-ID is reused for multiple iterations of platform deployments."><i style="margin-left: 0.6em; margin-top: 0em; color: #4db0fb;" class="fa fa-info"></i></a>',
					
				},
				
				
				
				// SHIP (SOT)
				
				{
					id: 'ptfShip',
					label: 'Ship',
					extraLabel: '<a class="info-btn" data-html="true" data-toggle="popover" data-trigger="hover" '+
					'title="Deployment ship" data-placement="right" data-content="'+ (THEME.name == 'SOT' ? "Disabled here. Please use the field at the top of form." : "Find a ship to select in the list by typing in here a name, IMO, call sign or ICES code. Or type the start of a name and press enter to create a custom tag (eg. \'maersk\' will select all " +  VOCAB["PTF"].toLowerCase() + 's deployed by Maersk ships)') + '")>'+
			      	'<i style="margin-left: 0.6em; margin-top: 0em; color: #4db0fb;" class="fa fa-info"></i></a>',
					section: 'Ship',
					url: urlSearchFilteredShips, 
				    remoteFilter: true,
				    template: true, 
				//    optBis: 'ref', 
				    optFooter: 'countryName', 
				    optFooterBis: 'typeName', 
				    optCS: 'callSign', 
				    optIMO: 'imo', 
				//    optBisTitle: 'ICES Code',
				    idField: 'stringitemid', 
				    textField: 'nameAndICES',
					type: 'multi',
					shownOnly : ['SOT', 'OceanOPS'],
					allowFreeText: true,
					adjustWidth: 156,
					minimumInputLength: 3,
					placeholder: 'Type in a NAME, IMO, ICES',
				    disabled: THEME.name == 'SOT',
					groupId: 'ptfShip',
					help: (THEME.name == 'SOT' ? "Disabled here. Please use the field above." : "")
				},
				{
					label: 'Exclude',
					altLabel: 'Exclude selected ship',
					extraLabel: '<a class="info-btn" data-html="true" data-toggle="popover" data-trigger="hover" '+
					'title="Exclude selected ship" data-placement="right" data-content="Check this box to invert selection and exclude from results any '+ 
					VOCAB["PTF"].toLowerCase() + 's deployed by the selected ship ">'+
			      	'<i style="margin-left: 0.6em; margin-top: 0em; color: #4db0fb;" class="fa fa-info"></i></a>',
					section: 'Ship',
					type: 'checkbox',
					id: 'excludePtfShip',
					adjustWidth: -156,
					labelWidth: 88,
					shownOnly : ['SOT', 'OceanOPS'],
					help: 'Exclude from results any '+ VOCAB["PTF"].toLowerCase() + 's deployed by the selected ship',
					groupId: 'ptfShip'
				},
				{
					label: 'Registration country',
					type: 'multi',
					textField: 'name',
					id: 'shipCountries',
					section: 'Ship',
					shownOnly : ['SOT', 'OceanOPS'],
					flagOnFirstRow: true,
					url: urlAllCountry,
				},
				{
					label: 'Ship type',
					type: 'multi',
					textField: 'name',
					id: 'shipTypes',
					section: 'Ship',
					shownOnly : ['SOT','OceanOPS'],
					url: urlQueryShipType,
				},
				{
					label: 'Ship ICES Code',
					id: 'shipIces',
					section: 'Ship',
					shownOnly : ['SOT','OceanOPS'],
					type: 'text'
				},
				{
					label: 'Ship IMO number',
					id: 'shipImo',
					section: 'Ship',
					shownOnly : ['SOT','OceanOPS'],
					type: 'text'
				},
				{
					label: 'Ship Call Sign',
					id: 'shipCallsign',
					section: 'Ship',
					shownOnly : ['SOT','OceanOPS'],
					type: 'text'
				},
				{
					label: 'Ship MMSI',
					id: 'shipMmsi',
					section: 'Ship',
					shownOnly : ['SOT','OceanOPS'],
					type: 'text'
				},
				{
					label: 'Cruise',
					id: 'sotCruise',
					section: 'Ship & Cruise',
				    type: 'single',
				    url: urlSearchFilteredCruises,
				    remoteFilter: true,
				    template: true, 
				    textField: 'ref',
				    optFooter: 'departureDate', 
				    optFooterBis: 'arrivalDate', 
				    optBisTitle: 'Ship', 
				    optBis: 'ship', 
				    optMore: 'type',
				    extraField: 'name', 
				    idField: 'stringitemid', 
				    placeholder: 'Type in here a name or expo code', 
					help: 'Select a cruise taken by the ship',
					shownOnly : [], //['SOT'],
					adjustWidth: 165,
					labelWidth: 168
				},
				{
					label: 'Cruise line',
					id: 'cruiseLine',
					section: 'Ship & Cruise',
					type: 'single',
					textField: 'name',
					shownOnly : ['OceanOPS'],
					url: urlCruiseLines,
					groupId: 'cruiseLineStatus',
					adjustWidth: 40
				},
				{
					label: 'Line status',
					id: 'lineStatus',
					section: 'Ship & Cruise',
					shownOnly : ['OceanOPS'],
					type: 'single',
					textField: 'name',
					url: urlCruiseLineStatuses,
					groupId: 'cruiseLineStatus',
					labelWidth: 85,
					adjustWidth: -40
				},
				{
					label: 'Line type',
					id: 'lineType',
					section: 'Ship & Cruise',
					shownOnly : ['OceanOPS'],
					type: 'single',
					textField: 'name',
					url: urlCruiseLineTypes,
					groupId: 'lineTypeFamily',
					adjustWidth: 40
				},
				{
					label: 'Line family',
					id: 'lineFamily',
					section: 'Ship & Cruise',
					shownOnly : ['OceanOPS'],
					type: 'single',
					textField: 'name',
					url: urlCruiseLineFamilies,
					groupId: 'lineTypeFamily',
					labelWidth: 85,
					adjustWidth: -40
				},
				
				
				// DEPLOYMENT
				
				{
					label: (THEME.name == 'SOT' ? 'Start date' : 'Deployment date'),
					altLabel: 'Deployment date (Earliest)',
					section: 'Deployment',
					type: 'date',
					id: 'deplDateFrom',
					groupId: 'deplDate',
					adjustWidth: 80,
					labelWidth: 162,
					hidden : ['SOT'],
					placeholder: 'Earliest date'
				},
				{
					label: '',
					altLabel: 'Deployment date (Latest)',
					adjustWidth: -80,
					labelWidth: 1,
					section: 'Deployment',
					type: 'date',
					id: 'deplDateTo',
					groupId: 'deplDate',
					hidden : ['SOT'],
					placeholder: 'Latest date'
				},
				{
					label: 'Notification date',
					altLabel: 'Notification date (Earliest)',
					section: 'Deployment',
					type: 'date',
					id: 'notifDateFrom',
					groupId: 'notifDate',
					adjustWidth: 80,
					labelWidth: 162,
					hidden : ['SOT'],
					placeholder: 'Earliest date'
				},
				{
					label: '',
					altLabel: 'Notification date (Latest)',
					adjustWidth: -80,
					labelWidth: 1,
					section: 'Deployment',
					type: 'date',
					id: 'notifDateTo',
					groupId: 'notifDate',
					hidden : ['SOT'],
					placeholder: 'Latest date'
				},
				{
					label: 'Deployment latitude',
					altLabel: 'Deployment latitude (Min)',
					section: 'Deployment',
					type: 'number',
					id: 'deplLatFrom',
					placeholder: 'Minimum (eg. -90)',
					min: -90,
					max: 90,
					help: 'Enter the minimum latitude (eg. -90)',
					adjustWidth: 80,
					labelWidth: 162,
					hidden : ['SOT'],
					groupId: 'deplLat'
				},
				{
					label: '',
					altLabel: 'Deployment latitude (Max)',
					section: 'Deployment',
					type: 'number',
					id: 'deplLatTo',
					placeholder: 'Maximum (eg. 90)',
					min: -90,
					max: 90,
					help: 'Enter the maximum latitude (eg. 90)',
					adjustWidth: -80,
					labelWidth: 1,
					hidden : ['SOT'],
					groupId: 'deplLat'
				},
				{
					label: 'Deployment longitude',
					altLabel: 'Deployment longitude (Min)',
					section: 'Deployment',
					type: 'number',
					id: 'deplLonFrom',
					placeholder: 'Minimum (eg. -180)',
					min: -180,
					max: 180,
					help: 'Enter the minimum longitude (eg. -180)',
					adjustWidth: 80,
					labelWidth: 162,
					hidden : ['SOT'],
					groupId: 'deplLong'
				},
				{
					label: '',
					altLabel: 'Deployment longitude (Max)',
					section: 'Deployment',
					type: 'number',
					id: 'deplLonTo',
					placeholder: 'Maximum (eg. 180)',
					min: -180,
					max: 180,
					help: 'Enter the maximum longitude (eg. 180)',
					adjustWidth: -80,
					labelWidth: 1,
					hidden : ['SOT'],
					groupId: 'deplLong'
				},
				{
					label: 'Deployment ship',
					extraLabel: '<a class="info-btn" data-html="true" data-toggle="popover" data-trigger="hover" '+
					'title="Deployment ship" data-placement="right" data-content="Find a ship to select in the list. '+
					'Or type the start of a name and press enter to create a custom tag (eg. \'maersk\' will select all '+ 
					VOCAB["PTF"].toLowerCase() + 's deployed by Maersk ships) ">'+
			      	'<i style="margin-left: 0.6em; margin-top: 0em; color: #4db0fb;" class="fa fa-info"></i></a>',
					id: 'deplShip',
					section: 'Deployment',
					url: urlSearchFilteredShips, 
				    remoteFilter: true,
				    template: true, 
			//	    optBis: 'ref', 
				    optFooter: 'countryName', 
				    optFooterBis: 'typeName', 
				    optCS: 'callSign', 
				    optIMO: 'imo', 
			//	    optBisTitle: 'ICES Code',  
				    placeholder: 'Type in here a name, IMO, call sign or ICES code', 
				    idField: 'stringitemid', 
				    textField: 'nameAndICES',
					type: 'multi',
					hidden : ['SOT'],
					allowFreeText: true,
					help: 'Select a ship used to deploy the '+ VOCAB["PTF"].toLowerCase() 
				},
				{
					label: 'Deployed by ships from the current ship sample',
					altLabel: 'Deployed by ship sample',
					section: 'Deployment',
					type: 'checkbox',
					id: 'fromShipSample',
					adjustWidth: 140,
					labelWidth: 350,
					labelOneLine: true,
					hidden : ['SOT'],
					help: 'Exclude from results any '+ VOCAB["PTF"].toLowerCase() + 's deployed by the selected cruise',
					groupId: 'deplShipOptions'
				},
				{
					label: 'Exclude ship',
					altLabel: 'Exclude selected ship',
					extraLabel: '<a class="info-btn"  data-html="true" data-toggle="popover" data-trigger="hover" '+
					'title="Exclude selected ship" data-placement="right" data-content="Check this box to invert selection and exclude from results any '+ 
					VOCAB["PTF"].toLowerCase() + 's deployed by the selected ship ">'+
			      	'<i style="margin-left: 0.6em; margin-top: 0em; color: #4db0fb;" class="fa fa-info"></i></a>',
					section: 'Deployment',
					type: 'checkbox',
					id: 'excludeDeplShip',
					adjustWidth: -140,
					labelWidth: 130,
					hidden : ['SOT'],
					help: 'Exclude from results any '+ VOCAB["PTF"].toLowerCase() + 's deployed by the selected ship',
					groupId: 'deplShipOptions'
				},
				{
					label: 'Deployment cruise',
					id: 'deplCruise',
					section: 'Deployment',
				    type: 'single',
				    url: urlSearchFilteredCruises,
				    remoteFilter: true,
				    template: true, 
				    textField: 'ref',
				    optFooter: 'departureDate', 
				    optFooterBis: 'arrivalDate', 
				    optBisTitle: 'Ship', 
				    optBis: 'ship', 
				    optMore: 'type',
				    extraField: 'name', 
				    idField: 'stringitemid', 
				    placeholder: 'Type a name or expo code', 
					help: 'Select a cruise taken by the ship during the '+ VOCAB["PTF"].toLowerCase() + '\' deployment',
					groupId: 'deplCruise',
					hidden : ['SOT'],
					adjustWidth: 165,
					labelWidth: 168
				},
				{
					label: 'Exclude',
					altLabel: 'Exclude selected cruise',
					extraLabel: '<a class="info-btn" data-html="true" data-toggle="popover" data-trigger="hover" '+
					'title="Exclude selected cruise" data-placement="right" data-content="Check this box to invert selection and exclude from results any '
					+ VOCAB["PTF"].toLowerCase() + 's deployed by the selected cruise ">'+
			      	'<i style="margin-left: 0.6em; margin-top: 0em; color: #4db0fb;" class="fa fa-info"></i></a>',
					section: 'Deployment',
					type: 'checkbox',
					id: 'cruiseExclude',
					adjustWidth: -165,
					labelWidth: 95,
					hidden : ['SOT'],
					help: 'Exclude from results any '+ VOCAB["PTF"].toLowerCase() + 's deployed by the selected cruise',
					groupId: 'deplCruise'
				},
				{
					label: 'Deployment method',
					id: 'deplMethods',
					section: 'Deployment',
					type: 'multi',
					textField: 'name',
					url: urlDeplMethod,
					hidden : ['SOT'],
					help: 'Select the method used to deploy the '+ VOCAB["PTF"].toLowerCase()
				},
				{
					label: 'Deployment type',
					id: 'deplTypes',
					section: 'Deployment',
					type: 'multi',
					textField: 'name',
					url: urlQueryDeplType,
					hidden : ['SOT'],
					blankOption: true,
					help: 'Select one or more types of deployment'
				},
				{
					label: 'Deployment country',
					id: 'deplCountries',
					section: 'Deployment',
					type: 'multi',
					textField: 'name',
					url: urlAllCountry,
					hidden : ['SOT'],
					flagOnFirstRow: true,
					help: 'Select one or more countries'
				},
				{
					label: 'Deployment Sea Region',
					id: 'seaRegions',
					section: 'Deployment',
					type: 'multi',
					textField: 'name',
					url: urlQuerySeaRegion,
					hidden : ['SOT']
				},
				{
					label: 'Deployment Subregion',
					id: 'seaSubRegions',
					section: 'Deployment',
					type: 'multi',
					textField: 'name',
					url: urlQuerySeaSubRegion,
					hidden : ['SOT']
				},
				{
					label: 'Deployment Maritime Zone Sovereignty',
					id: 'sovereignties',
					section: 'Deployment',
					type: 'multi',
					textField: 'name',
					url: urlQuerySovereignty,
					hidden : ['SOT']
				},
				{
					label: 'Deployment Maritime Zone Claim',
					id: 'claims',
					section: 'Deployment',
					type: 'multi',
					textField: 'name',
					url: urlQueryClaim,
					hidden : ['SOT']
				},
				{
					label: 'Deployment Argo Design Oceans',
					id: 'deplArgoDesignOceans',
					section: 'Deployment',
					type: 'multi',
					textField: 'name',
					url: urlQueryArgoDesignOceans,
					hidden : ['SOT']
				},				
				
				
				
				// IDENTIFIERS
				
				{
					label: 'Max S/N',
					extraLabel: '<a class="info-btn" data-html="true" data-toggle="popover" data-trigger="hover" '+
					'title="Maximum serial number" data-placement="right" data-content="If a number is entered this will limit the serial number matching to numbers below">'+
			      	'<i style="margin-left: 0.6em; margin-top: 0em; color: #4db0fb;" class="fa fa-info"></i></a>',
					id: 'maxSerial',
					section: 'Identifiers',
					type: 'text',
					hidden : ['SOT'],
					groupId: 'serialNumber',
					labelWidth: 100,
					adjustWidth: -40
				},
				
				{
					label: 'Has WIGOS ID associated',
					section: 'Identifiers',
					type: 'radio',
					id: 'hasWigosId',
					options: [
						{
							label: 'Ignore',
							value: 0,
							isDefault: true
						},
						{
							label: 'Yes',
							value: 1
						},
						{
							label: 'No',
							value: 2
						}
					]
				},
				
				
				
				// TELECOM
				
				
				{
					label: (THEME.name == 'SOT' ? 'Ship2Shore dataformat'  : 'Telecom format'),
					id: 'telFormats',
					section: 'Telecom',
					url: urlTelFormats, 
				    textField: 'name',
				    type: 'single',
					shownOnly : ['SOT', 'OceanOPS']
				},
				{
					label: 'Tracking system',
					id: 'trackingSystem',
					section: 'Telecom',
					url: urlTrackingSystems, 
				    textField: 'name',
				    type: 'single',
					hidden : ['SOT']
				},
				{
					label: 'IMEI',
					extraLabel: '<a class="info-btn" data-html="true" data-toggle="popover" data-trigger="hover" title="IMEI" '+
					'data-placement="right" data-content="Available only to logged in users. Either enter a 15 digit number or less to '+
					'filter all IMEIs starting with the entered number."><i style="margin-left: 0.6em; margin-top: 0em; color: #4db0fb;" class="fa fa-info"></i></a>',
					id: 'imei',
					section: 'Telecom',
					onlyLoggedIn: true,
					type: 'text',
					hidden : ['SOT']
				},
				{
					label: 'Backup telecom type',
					type: 'multi',
					textField: 'name',
					id: 'backupTelType',
					section: 'Telecom',
					url: urlMasterProgTelTypes,
					groupId: 'backupTelTypeNum',
					adjustWidth: 45,
					shownOnly: [] // ['SOT']
				},
				{
					label: 'Backup telecom number',
					id: 'backupTelNum',
					section: 'Telecom',
					type: 'text',
					groupId: 'backupTelTypeNum',
					adjustWidth: -45,
					labelWidth: 125,
					labelTwoLine: true,
					shownOnly: [] // ['SOT']
				},
				{
					label: 'Backup telecom service',
					id: 'backupTelServices',
					section: 'Telecom',
					url: urlTelServices, 
				    textField: 'name',
				    type: 'single',
					shownOnly: [] // ['SOT']
				},
				{
					label: 'Backup telecom format',
					id: 'backupTelFormats',
					section: 'Telecom',
					url: urlTelFormats, 
				    textField: 'name',
				    type: 'single',
					shownOnly: [] // ['SOT']
				},
				{
					label: 'Backup IMEI',
					extraLabel: '<a class="info-btn" data-html="true" data-toggle="popover" data-trigger="hover" title="IMEI" '+
					'data-placement="right" data-content="Available only to logged in users. Either enter a 15 digit number or '+
					'less to filter all IMEIs starting with the entered number."><i style="margin-left: 0.6em; margin-top: 0em; color: #4db0fb;" class="fa fa-info"></i></a>',
					id: 'backupTelImei',
					section: 'Telecom',
					onlyLoggedIn: true,
					type: 'text',
					shownOnly: [] // ['SOT']
				},
				
				
				// HARDWARE
				
				{
					label: 'Battery',
					id: 'battery',
					section: 'Hardware',
					url: urlQueryBattery, 
				    textField: 'name',
				    type: 'single',
					hidden : ['SOT']
				},
				{
					label: 'Software name',
					id: 'softName',
					section: 'Hardware',
					type: 'text',
					hidden : ['SOT']
				},
				{
					label: 'Control board',
					id: 'ctrlBoard',
					section: 'Hardware',
					url: urlControlBoards, 
				    textField: 'name',
				    idField: 'name',
				    type: 'multi',
					hidden : ['SOT', 'DBCP']
				},
				{
					label: 'Software version',
					id: 'softVersion',
					section: 'Hardware',
					url: urlSoftVersions, 
				    textField: 'name',
				    type: 'single',
					hidden : ['SOT']
				},
				{
					label: 'Control board serial number',
					id: 'crtlBrdSerial',
					section: 'Hardware',
					type: 'text',
					hidden : ['SOT']
				},
				{
					label: 'Software format',
					id: 'softFormat',
					section: 'Hardware',
					url: urlSoftwareFormats, 
				    textField: 'name',
				    type: 'single',
					hidden : ['SOT']
				},
				
				
				
				// SENSORS
				
				{
					label: 'Variable family',
					type: 'multi',
					textField: 'name',
					optMore: 'eovEcv',
					id: 'variableFamily',
					section: 'Sensors',
					hidden: ['Argo', 'SOT'],
					url: urlQueryVariableFamily
				},
				{
					label: 'Variables',
					type: 'multi',
					textField: 'name',
					optMore: 'variableFamily',
					optFooter:'P02_REF',
					id: 'variables',
					section: 'Sensors',
					hidden: ['SOT'],
					url: urlQueryVariables
				},
				{
					label: 'Exclude selected<br>variables',
					altLabel: 'Exclude selected variables',
					extraLabel: '<a class="info-btn" data-html="true" data-toggle="popover" data-trigger="hover" '+
					'title="Exclude selected variables" data-placement="right" data-content="Check this box to invert selection and exclude from results any '+ 
					VOCAB["PTF"].toLowerCase() + 's with sensors for these variables">'+
			      	'<i style="margin-left: 0.6em; margin-top: 0em; color: #4db0fb;" class="fa fa-info"></i></a>',
					section: 'Sensors',
					type: 'checkbox',
					hidden: ['SOT'],
					groupId: 'variableCheckboxes',
					id: 'variableExclude'
				},
				{
					label: 'Must measure all <br>selected variables',
					altLabel: 'Must measure all selected variables',
					extraLabel: '<a class="info-btn" data-html="true" data-toggle="popover" data-trigger="hover" '+
					'title="Must measure all selected variables" data-placement="right" data-content="Check this box to exclude from results any '+ 
					VOCAB["PTF"].toLowerCase() + 's that don\'t measure each and every one of the selected variables.">'+
			      	'<i style="margin-left: 0.6em; margin-top: 0em; color: #4db0fb;" class="fa fa-info"></i></a>',
					section: 'Sensors',
					type: 'checkbox',
					hidden: ['SOT'],
					groupId: 'variableCheckboxes',
					id: 'variableMustMeasureAll'
				},
				{
					label: 'Sensor families',
					section: 'Sensors',
					type: 'multi',
					textField: 'name',
					id: 'sensorfamilies',
					shownOnly: ['SOT','OceanOPS'],
					url: urlQuerySensorFamily
				},
				{
					label: 'Sensor types',
					type: 'multi',
					textField: 'name',
					id: 'sensortypes',
					optMore: 'family',
					section: 'Sensors',
					url: urlQuerySensorType
				},
				{
					label: 'Sensor models',
					extraLabel: '<a class="info-btn" data-html="true" data-toggle="popover" data-trigger="hover" '+
					'title="Sensor models" data-placement="right" data-content="Type into the select box a model '+
					'name, type, manufacturer or BODC ID to filter the proposed options.">'+
			      	'<i style="margin-left: 0.6em; margin-top: 0em; color: #4db0fb;" class="fa fa-info"></i></a>',
					type: 'multi',
					textField: 'name',
					id: 'sensormodels',
					section: 'Sensors',
					url: urlSearchFilteredSensorModels + "?allIfNoFilter=true",
					optionid: '',
					optiontext : '',
				    optFooter: 'type', 
				    optFooterBis: 'family', 
				    optMore: 'manufacturer', 
				    optBis: 'bodcId',
				    optBisTitle: 'BODC ID', 
				    optExtraRow: 'variables',
				    remoteFilter: true,
				    template: true,
					placeholder: 'Type in here a model name, type or manufacturer',
				    idField: 'stringitemid'
				},
				{
					label: 'Minimum sensor<br>height (m)',
					shownOnly: ['OceanSITES','OceanOPS'],
					section: 'Sensors',
					type: 'number',
					id: 'minimumSensorDepth',
					labelWidth: 161,
					extraLabel: '<a class="info-btn" data-html="true" data-toggle="popover" data-trigger="hover" ' +
					'title="Nominal sensor height" data-placement="right" data-content="These two fields work only combined with ' +
					'the sensor models field. The sensor depth corresponds to the amount of meters ' +
					'below sea level. Enter a value (eg. -2000) in one or both minimum and maximum fields to define a range. ' +
					'The specified models must be within this range."><i style="margin-left: 0.6em;'+
					' margin-top: 0em; color: #4db0fb;" class="fa fa-info"></i></a>',
					groupId: 'sensorDepth',
					adjustWidth: 40
				},
				{
					label: 'Maximum sensor height',
					shownOnly: ['OceanSITES','OceanOPS'],
					section: 'Sensors',
					type: 'number',
					id: 'maximumSensorDepth',
					labelWidth: 100,
					adjustWidth: -40,
					labelTwoLine: true,
					groupId: 'sensorDepth'
				},
				{
					label: 'Sensor serial number',
					id: 'sensorSerialId',
					section: 'Sensors',
					type: 'text',
					groupId: 'sensorSerialNumber',
					adjustWidth: 40
				},
				{
					label: 'Max S/N',
					altLabel: 'Max sensor S/N',
					extraLabel: '<a class="info-btn" data-html="true" data-toggle="popover" data-trigger="hover" '+
					'title="Maximum sensor serial number" data-placement="right" data-content="If a number is '+
					'entered this will limit the serial number matching to numbers below">'+
			      	'<i style="margin-left: 0.6em; margin-top: 0em; color: #4db0fb;" class="fa fa-info"></i></a>',
					id: 'maxSensorSerial',
					section: 'Sensors',
					type: 'text',
					groupId: 'sensorSerialNumber',
					labelWidth: 100,
					adjustWidth: -40
				},
				{
					label: 'No sensors provided yet',
					section: 'Sensors',
					type: 'checkbox',
					id: 'noSensors',
					groupId: 'noSensors',
					labelOneLine: true
				},
				
				
				
				// CONFIGURATION
				
				{
					label: 'Cycle time (hours)',
					section: 'Configuration',
					type: 'number',
					id: 'totalCycleTime',
					hidden : ['DBCP', 'OceanSITES', 'SOT'],
					help: 'Enter the duration of one cycle in hours (eg. 240)',
					adjustWidth: 50,
					labelWidth: 167,
					groupId: 'cycleTime'
				},
				{
					label: 'Min (hours)',
					altLabel: 'Minimum cycle time',
					section: 'Configuration',
					type: 'number',
					id: 'minTotalCycleTime',
					hidden : ['DBCP', 'OceanSITES', 'SOT'],
					help: 'Enter the minimum duration of one cycle in hours (eg. 240)',
					adjustWidth: -25,
					labelWidth: 90,
					groupId: 'cycleTime'
				},
				{
					label: 'Max (hours)',
					altLabel: 'Maximum cycle time',
					section: 'Configuration',
					type: 'number',
					id: 'maxTotalCycleTime',
					hidden : ['DBCP', 'OceanSITES', 'SOT'],
					help: 'Enter the maximum duration of one cycle in hours (eg. 240)',
					adjustWidth: -25,
					labelWidth: 90,
					groupId: 'cycleTime'
				},
				{
					label: 'Surface time (hours)',
					section: 'Configuration',
					type: 'number',
					id: 'surfaceTime',
					hidden : ['DBCP', 'OceanSITES', 'SOT'],
					help: 'Enter the duration of surface time in hours (eg. 240)',
					adjustWidth: 50,
					labelWidth: 167,
					groupId: 'surfaceTime'
				},
				{
					label: 'Min (hours)',
					altLabel: 'Minimum surface time',
					section: 'Configuration',
					type: 'number',
					id: 'minSurfaceTime',
					hidden : ['DBCP', 'OceanSITES', 'SOT'],
					help: 'Enter the minimum duration of surface time in hours (eg. 240)',
					adjustWidth: -25,
					labelWidth: 90,
					groupId: 'surfaceTime'
				},
				{
					label: 'Max (hours)',
					altLabel: 'Maximum surface time',
					section: 'Configuration',
					type: 'number',
					id: 'maxSurfaceTime',
					hidden : ['DBCP', 'OceanSITES', 'SOT'],
					help: 'Enter the maximum duration of surface time in hours (eg. 240)',
					adjustWidth: -25,
					labelWidth: 90,
					groupId: 'surfaceTime'
				},
				{
					label: 'Drift pressure (dbar)',
					section: 'Configuration',
					type: 'number',
					id: 'driftDepth',
					hidden : ['DBCP', 'OceanSITES', 'SOT'],
					help: 'Enter the amount of drift pressure in dbar (eg. 2100)',
					adjustWidth: 50,
					labelWidth: 166,
					groupId: 'driftDepth'
				},
				{
					label: 'Min (dbar)',
					altLabel: 'Minimum drift pressure',
					section: 'Configuration',
					type: 'number',
					id: 'minDriftDepth',
					hidden : ['DBCP', 'OceanSITES', 'SOT'],
					help: 'Enter the minimum amount of drift pressure in dbar (eg. 2100)',
					adjustWidth: -25,
					labelWidth: 90,
					groupId: 'driftDepth'
				},
				{
					label: 'Max (dbar)',
					altLabel: 'Maximum drift pressure',
					section: 'Configuration',
					type: 'number',
					id: 'maxDriftDepth',
					hidden : ['DBCP', 'OceanSITES', 'SOT'],
					help: 'Enter the maximum amount of drift pressure in dbar (eg. 2100)',
					adjustWidth: -25,
					labelWidth: 90,
					groupId: 'driftDepth'
				},
				{
					label: 'Profile pressure (dbar)',
					section: 'Configuration',
					type: 'number',
					id: 'profileDepth',
					hidden : ['DBCP', 'OceanSITES', 'SOT'],
					help: 'Enter the amount of profile pressure in dbar (eg. 2100)',
					adjustWidth: 50,
					labelWidth: 166,
					groupId: 'profileDepth'
				},
				{
					label: 'Min (dbar)',
					altLabel: 'Minimum profile pressure',
					section: 'Configuration',
					type: 'number',
					id: 'minProfileDepth',
					hidden : ['DBCP', 'OceanSITES', 'SOT'],
					help: 'Enter the minimum amount of profile pressure in dbar (eg. 2100)',
					adjustWidth: -25,
					labelWidth: 90,
					groupId: 'profileDepth'
				},
				{
					label: 'Max (dbar)',
					altLabel: 'Maximum profile pressure',
					section: 'Configuration',
					type: 'number',
					id: 'maxProfileDepth',
					hidden : ['DBCP', 'OceanSITES', 'SOT'],
					help: 'Enter the maximum amount of profile pressure in dbar (eg. 2100)',
					adjustWidth: -25,
					labelWidth: 90,
					groupId: 'profileDepth'
				},
				{
					label: 'Sampling levels quantity',
					section: 'Configuration',
					type: 'number',
					id: 'sampleLevels',
					hidden : ['DBCP', 'OceanSITES', 'SOT'],
					help: 'Enter the amount of sampling levels (eg. 29)',
					adjustWidth: 50,
					labelWidth: 166,
					groupId: 'sampleLevels'
				},
				{
					label: 'Min',
					altLabel: 'Minimum sampling levels',
					section: 'Configuration',
					type: 'number',
					id: 'minSampleLevels',
					hidden : ['DBCP', 'OceanSITES', 'SOT'],
					help: 'Enter the minimum amount of sampling levels (eg. 29)',
					adjustWidth: -25,
					labelWidth: 90,
					groupId: 'sampleLevels'
				},
				{
					label: 'Max',
					altLabel: 'Maximum sampling levels',
					section: 'Configuration',
					type: 'number',
					id: 'maxSampleLevels',
					hidden : ['DBCP', 'OceanSITES', 'SOT'],
					help: 'Enter the maximum amount of sampling levels (eg. 29)',
					adjustWidth: -25,
					labelWidth: 90,
					groupId: 'sampleLevels'
				},				
				{
					label: 'Ice detection',
					section: 'Configuration',
					type: 'checkbox',
					id: 'iceDetect',
					hidden : ['DBCP', 'OceanSITES', 'SOT'],
					help: 'Check this box if the '+ VOCAB["PTF"].toLowerCase() + ' has ice detection software installed'
				},
				{
					label: 'No ice detection',
					section: 'Configuration',
					type: 'checkbox',
					id: 'noIceDetect',
					hidden : ['DBCP', 'OceanSITES', 'SOT'],
					help: 'Check this box for '+ VOCAB["PTF"].toLowerCase() + ' with no ice detection software installed'
				},
				
				
				
				// RETRIEVAL
				

				
				{
					label: 'Retrieval status',
					id: 'retrievalStatus',
					section: 'Retrieval',
					url: urlRetrievalStatus, 
				    textField: 'name',
					hidden : ['SOT'],
				    type: 'multi'
				},
				{
					label: 'Post-Retrieval status',
					id: 'postRetrievalStatus',
					section: 'Retrieval',
					url: urlGetAllPostRetrievalStatus, 
				    textField: 'name',
					hidden : ['SOT'],
				    type: 'multi'
				},
				{
					label: 'Retrieval country',
					id: 'retrievalCountry',
					section: 'Retrieval',
					url: urlRetrievalCountry, 
				    textField: 'name',
					flagOnFirstRow: true,
					hidden : ['SOT'],
				    type: 'single'
				},
				{
					label: (THEME.name == 'OceanGliders' ? 'Recovery' : 'Retrieval start') + ' date',
					altLabel: (THEME.name == 'OceanGliders' ? 'Recovery' : 'Retrieval start') + ' date (Earliest)',
					section: 'Retrieval',
					type: 'date',
					id: 'retrievalStartDateFrom',
					groupId: 'retrievalStartDate',
					adjustWidth: 80,
					labelWidth: 162,
					hidden : ['SOT'],
					placeholder: 'Earliest date'
				},
				{
					label: '',
					altLabel: (THEME.name == 'OceanGliders' ? 'Recovery' : 'Retrieval start') + ' date (Latest)',
					adjustWidth: -80,
					labelWidth: 1,
					section: 'Retrieval',
					type: 'date',
					id: 'retrievalStartDateTo',
					groupId: 'retrievalStartDate',
					hidden : ['SOT'],
					placeholder: 'Latest date'
				},
				{
					label: 'Retrieval end date',
					altLabel: 'Retrieval end date (Earliest)',
					section: 'Retrieval',
					type: 'date',
					id: 'retrievalEndDateFrom',
					groupId: 'retrievalEndDate',
					adjustWidth: 80,
					labelWidth: 162,
					hidden : ['OceanGliders', 'SOT'],
					placeholder: 'Earliest date'
				},
				{
					label: '',
					altLabel: 'Retrieval end date (Latest)',
					adjustWidth: -80,
					labelWidth: 1,
					section: 'Retrieval',
					type: 'date',
					id: 'retrievalEndDateTo',
					groupId: 'retrievalEndDate',
					hidden : ['OceanGliders', 'SOT'],
					placeholder: 'Latest date'
				},

				{
					label: 'Retrieval latitude',
					altLabel: 'Retrieval latitude (Min)',
					section: 'Retrieval',
					type: 'number',
					id: 'retrievalLatFrom',
					placeholder: 'Minimum (eg. -90)',
					min: -90,
					max: 90,
					help: 'Enter the minimum latitude (eg. -90)',
					adjustWidth: 80,
					labelWidth: 162,
					shownOnly : ['OceanGliders','OceanOPS'],
					groupId: 'retrievalLat'
				},
				{
					label: '',
					altLabel: 'Retrieval latitude (Max)',
					section: 'Retrieval',
					type: 'number',
					id: 'retrievalLatTo',
					placeholder: 'Maximum (eg. 90)',
					min: -90,
					max: 90,
					help: 'Enter the maximum latitude (eg. 90)',
					adjustWidth: -80,
					labelWidth: 1,
					shownOnly : ['OceanGliders','OceanOPS'],
					groupId: 'retrievalLat'
				},
				{
					label: 'Retrieval longitude',
					altLabel: 'Retrieval longitude (Min)',
					section: 'Retrieval',
					type: 'number',
					id: 'retrievalLonFrom',
					placeholder: 'Minimum (eg. -180)',
					min: -180,
					max: 180,
					help: 'Enter the minimum longitude (eg. -180)',
					adjustWidth: 80,
					labelWidth: 162,
					shownOnly : ['OceanGliders','OceanOPS'],
					groupId: 'retrievalLong'
				},
				{
					label: '',
					altLabel: 'Retrieval longitude (Max)',
					section: 'Retrieval',
					type: 'number',
					id: 'retrievalLonTo',
					placeholder: 'Maximum (eg. 180)',
					min: -180,
					max: 180,
					help: 'Enter the maximum longitude (eg. 180)',
					adjustWidth: -80,
					labelWidth: 1,
					shownOnly : ['OceanGliders','OceanOPS'],
					groupId: 'retrievalLong'
				},
				{
					label: 'No retrieval (remove from sample any '+ VOCAB["PTF"].toLowerCase() + 's with retrievals)',
					altLabel: 'No retrieval',
					section: 'Retrieval',
					type: 'checkbox',
					id: 'retrievalExclude',
					labelWidth: 410,
					groupId: 'noRetrieval',
					hidden : ['SOT'],
					labelOneLine: true
				},
				
				
				// LOCATIONS
				
				{
					label: 'Location date',
					altLabel: 'Location date (Earliest)',
					section: 'Latest Location',
					type: 'date',
					id: 'locDateFrom',
					groupId: 'locDate',
					adjustWidth: 80,
					labelWidth: 162,
					hidden : ['SOT'],
					placeholder: 'Earliest date'
				},
				{
					label: '',
					altLabel: 'Location date (Latest)',
					adjustWidth: -80,
					labelWidth: 1,
					section: 'Latest Location',
					type: 'date',
					id: 'locDateTo',
					groupId: 'locDate',
					hidden : ['SOT'],
					placeholder: 'Latest date'
				},
				{
					label: 'Location latitude',
					altLabel: 'Location latitude (Min)',
					section: 'Latest Location',
					type: 'number',
					id: 'locLatFrom',
					placeholder: 'Minimum (eg. -90)',
					min: -90,
					max: 90,
					help: 'Enter the minimum latitude (eg. -90)',
					adjustWidth: 80,
					labelWidth: 162,
					hidden : ['SOT'],
					groupId: 'locLat'
				},
				{
					label: '',
					altLabel: 'Location latitude (Max)',
					section: 'Latest Location',
					type: 'number',
					id: 'locLatTo',
					placeholder: 'Maximum (eg. 90)',
					min: -90,
					max: 90,
					help: 'Enter the maximum latitude (eg. 90)',
					adjustWidth: -80,
					labelWidth: 1,
					hidden : ['SOT'],
					groupId: 'locLat'
				},
				{
					label: 'Location longitude',
					altLabel: 'Location longitude (Min)',
					section: 'Latest Location',
					type: 'number',
					id: 'locLonFrom',
					placeholder: 'Minimum (eg. -180)',
					min: -180,
					max: 180,
					help: 'Enter the minimum longitude (eg. -180)',
					adjustWidth: 80,
					labelWidth: 162,
					hidden : ['SOT'],
					groupId: 'locLong'
				},
				{
					label: '',
					altLabel: 'Location longitude (Max)',
					section: 'Latest Location',
					type: 'number',
					id: 'locLonTo',
					placeholder: 'Maximum (eg. 180)',
					min: -180,
					max: 180,
					help: 'Enter the maximum longitude (eg. 180)',
					adjustWidth: -80,
					labelWidth: 1,
					hidden : ['SOT'],
					groupId: 'locLong'
				},
				{
					label: 'Location beached status',
					section: 'Latest Location',
					type: 'radio',
					id: 'beached',
					hidden : ['SOT'],
					options: [
						{
							label: 'Ignore',
							value: 0,
							isDefault: true
						},
						{
							label: 'Beached',
							value: 1
						},
						{
							label: 'Not beached',
							value: 2
						}
					]
				},
				{
					label: 'Location iced status',
					section: 'Latest Location',
					type: 'radio',
					id: 'iced',
					hidden : ['SOT'],
					options: [
						{
							label: 'Ignore',
							value: 0,
							isDefault: true
						},
						{
							label: 'Iced',
							value: 1
						},
						{
							label: 'Not iced',
							value: 2
						}
					]
				},
				{
					label: 'Location Sea Region',
					id: 'latestLocSeaRegions',
					section: 'Latest Location',
					type: 'multi',
					textField: 'name',
					hidden : ['SOT'],
					url: urlQuerySeaRegion
				},
				{
					label: 'Location Subregion',
					id: 'latestLocSeaSubRegions',
					section: 'Latest Location',
					type: 'multi',
					textField: 'name',
					hidden : ['SOT'],
					url: urlQuerySeaSubRegion
				},
				{
					label: 'Location Maritime Zone Sovereignty',
					id: 'latestLocSovereignties',
					section: 'Latest Location',
					type: 'multi',
					textField: 'name',
					hidden : ['SOT'],
					url: urlQuerySovereignty
				},
				{
					label: 'Location Maritime Zone Claim',
					id: 'latestLocClaims',
					section: 'Latest Location',
					type: 'multi',
					textField: 'name',
					hidden : ['SOT'],
					url: urlQueryClaim
				},
				{
					label: 'Location Argo Design Oceans',
					id: 'latestLocArgoDesignOceans',
					section: 'Latest Location',
					type: 'multi',
					textField: 'name',
					hidden : ['SOT'],
					url: urlQueryArgoDesignOceans
				},					
				{		
					label: 'Filter on all platform\'s locations, not just latest',
					altLabel: 'Latest location only',
					section: 'Latest Location',
					type: 'checkbox',
					id: 'lastLocOnly',
					shownOnly : ['Argo','OceanOPS']
				},
				
				
				// QUALITY CONTROL
				
				{
					label: 'Blacklisted',
					section: 'Quality Control',
					type: 'radio',
					id: 'blacklist',
					hidden: ['SOT'],
					options: [
						{
							label: 'Ignore',
							value: 2,
							isDefault: true
						},
						{
							label: 'Yes',
							value: 1
						},
						{
							label: 'No',
							value: 0
						}
					]
				},
				{
					label: 'Delayed Mode Acheived<br>Min (%)',
					altLabel: 'DM acheived (Min)',
					section: 'Quality Control',
					type: 'number',
					id: 'dmMin',
					shownOnly: ['Argo','OceanOPS'],
					adjustWidth: 50,
					labelWidth: 162,
					max: 100,
					groupId: 'dmAcheived'
				},
				{
					label: 'Max (%)',
					altLabel: 'DM acheived (Max)',
					section: 'Quality Control',
					type: 'number',
					id: 'dmMax',
					shownOnly: ['Argo','OceanOPS'],
					adjustWidth: -50,
					labelWidth: 65,
					max: 100,
					groupId: 'dmAcheived'
				},
				{
					label: 'Pending feedback',
					section: 'Quality Control',
					type: 'checkbox',
					id: 'pendingFeedback',
					hidden: ['SOT'],
					labelOneLine: true
				},
				{
					label: 'QC Feedback Error type',
					id: 'qcErrorType',
					section: 'Quality Control',
					url: urlGetQcErrorTypes, 
				    textField: 'name',
					hidden: ['SOT'],
				    type: 'single'
				},
				{
					label: 'QC Feedback Action',
					id: 'qcAction',
					section: 'Quality Control',
					url: urlGetQcFeedbackActions, 
				    textField: 'name',
					hidden: ['SOT'],
				    type: 'single'
				},
				{
					label: 'QC Feedback Variable',
					id: 'qcVariable',
					section: 'Quality Control',
					url: urlQueryVariables, 
				    textField: 'name',
					hidden: ['SOT'],
				    type: 'single'
				},
				{
					label: 'QC Feedback Type',
					id: 'qcFeedbackType',
					section: 'Quality Control',
					url: urlQueryPtfQcFeedbackTypes, 
				    textField: 'name',
					hidden: ['SOT'],
				    type: 'single'
				},
				
				
				
				// DATA
				

				{
					label: 'Available on',
					extraLabel: DataSectionInfoPopover,
					id: 'gdacs',
					section: 'Data',
					type: 'multi',
					textField: 'name',
					shownOnly: ['Argo','OceanOPS'],
					url: urlQueryPtfGdacs,
					adjustWidth: 40,
					groupId: 'gdacs'
				},	
				{
					label: '',
					altLabel: 'GDACs filter',
					section: 'Data',
					type: 'radio',
					id: 'allGdacs',
					groupId: 'gdacs',
					labelWidth: 1,
					adjustWidth: -40,
					shownOnly: ['Argo','OceanOPS'],
					options: [
						{
							label: 'All selected',
							value: 1
						},
						{
							label: 'At least one',
							value: 0,
							isDefault: true
						}
					]
				},
				{
					label: 'Unavailable on',
					extraLabel: DataSectionInfoPopover,
					id: 'notGdacs',
					section: 'Data',
					type: 'multi',
					textField: 'name',
					groupId: 'notGdacs',
					shownOnly: ['Argo','OceanOPS'],
					adjustWidth: 40,
					url: urlQueryPtfGdacs
				},	
				{
					label: '',
					altLabel: 'GDACs exclusion filter',
					section: 'Data',
					type: 'radio',
					id: 'allNotGdacs',
					groupId: 'notGdacs',
					shownOnly: ['Argo','OceanOPS'],
					labelWidth: 1,
					adjustWidth: -40,
					options: [
						{
							label: 'All selected',
							value: 1,
							isDefault: true
						},
						{
							label: 'At least one',
							value: 0
						}
					]
				},
				{
					label: 'Processed by',
					extraLabel: DataSectionInfoPopover,
					id: 'dacs',
					section: 'Data',
					type: 'multi',
					textField: 'name',
					groupId: 'dacs',
					hidden: ['SOT'],
					url: urlQueryPtfDacs,
					adjustWidth: 40
				},
				{
					label: '',
					altLabel: 'DACs filter',
					section: 'Data',
					type: 'radio',
					id: 'allDacs',
					groupId: 'dacs',
					labelWidth: 1,
					adjustWidth: -40,
					hidden: ['SOT'],
					options: [
						{
							label: 'All selected',
							value: 1
						},
						{
							label: 'At least one',
							value: 0,
							isDefault: true
						}
					]
				},
				{
					label: 'Observation date',
					extraLabel: DataSectionInfoPopover,
					altLabel: 'Observation date (Earliest)',
					section: 'Data',
					type: 'date',
					id: 'obsDateFrom',
					groupId: 'obsDate',
					hidden: ['SOT'],
					adjustWidth: 80,
					labelWidth: 162,
					placeholder: 'Earliest date'
				},
				{
					label: '',
					altLabel: 'Observation date (Latest)',
					adjustWidth: -80,
					labelWidth: 1,
					section: 'Data',
					type: 'date',
					hidden: ['SOT'],
					id: 'obsDateTo',
					groupId: 'obsDate',
					placeholder: 'Latest date'
				},
				{
					label: 'Observation latitude',
					extraLabel: DataSectionInfoPopover,
					altLabel: 'Observation latitude (Min)',
					section: 'Data',
					type: 'number',
					id: 'obsLatFrom',
					placeholder: 'Minimum (eg. -90)',
					min: -90,
					max: 90,
					help: 'Enter the minimum latitude (eg. -90)',
					adjustWidth: 80,
					labelWidth: 162,
					hidden: ['SOT'],
					groupId: 'obsLat'
				},
				{
					label: '',
					altLabel: 'Observation latitude (Max)',
					section: 'Data',
					type: 'number',
					id: 'obsLatTo',
					placeholder: 'Maximum (eg. 90)',
					min: -90,
					max: 90,
					help: 'Enter the maximum latitude (eg. 90)',
					adjustWidth: -80,
					labelWidth: 1,
					hidden: ['SOT'],
					groupId: 'obsLat'
				},
				{
					label: 'Observation longitude',
					altLabel: 'Observation longitude (Min)',
					section: 'Data',
					type: 'number',
					id: 'obsLonFrom',
					placeholder: 'Minimum (eg. -180)',
					min: -180,
					max: 180,
					help: 'Enter the minimum longitude (eg. -180)',
					adjustWidth: 80,
					labelWidth: 162,
					hidden: ['SOT'],
					groupId: 'obsLong'
				},
				{
					label: '',
					altLabel: 'Observation longitude (Max)',
					section: 'Data',
					type: 'number',
					id: 'obsLonTo',
					placeholder: 'Maximum (eg. 180)',
					min: -180,
					max: 180,
					help: 'Enter the maximum longitude (eg. 180)',
					adjustWidth: -80,
					labelWidth: 1,
					hidden: ['SOT'],
					groupId: 'obsLong'
				}
				,
				{
					label: 'PSAL Adjustment (mean) Above absolute',
					altLabel: 'Absolute PSAL Adjustment',
					section: 'Data',
					type: 'number',
					id: 'obsAdMeanPsalAbs',
					shownOnly : ['Argo','OceanOPS'],
					adjustWidth: 50,
					labelWidth: 167,
					groupId: 'psalMean'
				},
				{
					label: 'Min (PSU)',
					altLabel: 'Minimum PSAL Adjustment',
					section: 'Data',
					type: 'number',
					id: 'obsAdMeanPsalMin',
					shownOnly : ['Argo','OceanOPS'],
					adjustWidth: -25,
					labelWidth: 90,
					groupId: 'psalMean'
				},
				{
					label: 'Max (PSU)',
					altLabel: 'Maximum PSAL Adjustment',
					section: 'Data',
					type: 'number',
					id: 'obsAdMeanPsalMax',
					shownOnly : ['Argo','OceanOPS'],
					adjustWidth: -25,
					labelWidth: 90,
					groupId: 'psalMean'
				},
				{
					label: 'PSAL Adjust. (deviation) Above absolute',
					altLabel: 'Absolute PSAL Adjustment',
					section: 'Data',
					type: 'number',
					id: 'obsAdDevPsalAbs',
					shownOnly : ['Argo','OceanOPS'],
					adjustWidth: 50,
					labelWidth: 167,
					groupId: 'psalDev'
				},
				{
					label: 'Min (PSU)',
					altLabel: 'Minimum PSAL Adjustment',
					section: 'Data',
					type: 'number',
					id: 'obsAdDevPsalMin',
					shownOnly : ['Argo','OceanOPS'],
					adjustWidth: -25,
					labelWidth: 90,
					groupId: 'psalDev'
				},
				{
					label: 'Max (PSU)',
					altLabel: 'Maximum PSAL Adjustment',
					section: 'Data',
					type: 'number',
					id: 'obsAdDevPsalMax',
					shownOnly : ['Argo','OceanOPS'],
					adjustWidth: -25,
					labelWidth: 90,
					groupId: 'psalDev'
				},
				{
					label: 'Data status',
					extraLabel: DataSectionInfoPopover,
					id: 'obsDataStatus',
					section: 'Data',
					type: 'multi',
					textField: 'name',
					idField: 'name',
					hidden: ['SOT','OceanOPS'],
					url: urlAllObsDataStatuses
				},		
				{
					label: 'Standby observations',
					altLabel: 'Standby obs years old',
					extraLabel: ObsStandbyInfoPopover,
					section: 'Data',
					type: 'number',
					id: 'yearsInStandby',
					placeholder: '# of years',
					adjustWidth: 200,
					labelWidth: 185,
					labelTwoLine: true,
					hidden: ['SOT'],
					groupId: 'standbyObs'
				},
				{
					label: '',
					placeholder: 'All variables',
					id: 'obsStandbyVariables',
					altLabel: 'Standby obs variables',
					section: 'Data',
					type: 'multi',
					textField: 'name',
					idField: 'id',
					hidden: ['SOT'],
					adjustWidth: -30,
					labelWidth: 1,
					url: urlQueryBgcVariables,
					groupId: 'standbyObs'
				},
				{
					type: 'checkbox',
					id: 'standbyObsExcludeAdjusted',
					label: 'Exclude Adjusted',
					altLabel: 'Exclude Adjusted from Standby Obs',
					hidden: ['SOT'],
					labelWidth: 90,
					section: 'Data',
					labelTwoLine: true,
					groupId: 'standbyObs'
				},
				{
					type: 'checkbox',
					id: 'lastObsOnly',
					label: 'Apply filter to each float\'s latest observation only',
					extraLabel: '<a class="info-btn" data-placement="top" data-html="true" data-toggle="popover" data-trigger="hover" title="Two ways to apply criteria"'+
					' data-content="' +
					'&#8226; Apply filter to each ' + VOCAB["PTF"].toLowerCase() + '\'s latest observation only (check box): the '+ 
					VOCAB["PTF"].toLowerCase() + '\'s latest observation must meet all of the chosen criteria.<br><br>'+
					'&#8226; Apply filter to any of ' + VOCAB["PTF"].toLowerCase() + '\'s observations (uncheck box): the ' + 
					VOCAB["PTF"].toLowerCase() + ' must have at least one observation meeting the criteria.'+
			      	'"><i style="margin-left: 0.6em; margin-top: 0em; color: #4db0fb;" class="fa fa-info"></i></a>',
					altLabel: 'Apply filter to all observations',
					shownOnly: ['Argo','OceanOPS'],
					labelWidth: 337,
					section: 'Data',
					labelOneLine: true,
					defaultValue: 'checked'
				},
				
				
				// MISCELLANEOUS
				

				{
					type: 'checkbox',
					id: 'isAdopted',
					label: 'Has been adopted',
					altLabel: 'Is adopted',
					//labelWidth: 337,
					section: 'Miscellaneous',
					labelOneLine: true,
					hidden: ['SOT'],
					defaultValue: null
				},
				{
					label: 'No DM Manager',
					altLabel: 'No associated DM manager',
					section: 'Miscellaneous',
					type: 'checkbox',
					hidden: ['SOT'],
					id: 'noDmManager',
					labelOneLine: true,
					defaultValue: null
				},
				
				
				
				// MARITIME ZONE WARNINGS
				
				{
					label: 'Warning status',
					extraLabel: '<a class="info-btn" data-html="true" data-toggle="popover" data-trigger="hover" '+
					'title="Warning status" data-placement="right" data-content="Selecting \'Any\' will filter ' + VOCAB["PTF"].toLowerCase() +
					's with at least one warning (checked or unchecked)">'+
				  	'<i style="margin-left: 0.6em; margin-top: 0em; color: #4db0fb;" class="fa fa-info"></i></a>',
					section: 'Maritime Zone Warnings',
					type: 'radio',
					shownOnly : ['Argo','OceanOPS'],
					id: 'warningsChecked',
					options: [
						{
							label: 'Ignore',
							value: 3,
							isDefault: true
						},
						{
							label: 'Any',
							value: 2,
							adjustWidth: -25
						},
						{
							label: 'Checked',
							value: 1
						},
						{
							label: 'Unchecked',
							value: 0,
							adjustWidth: 25
						}
					]
				},
				{
					label: 'Coastal state',
					id: 'warningCoastalState',
					section: 'Maritime Zone Warnings',
					url: urlCoastalStates, 
				    textField: 'name',
					shownOnly : ['Argo','OceanOPS'],
					flagOnFirstRow: true,
				    type: 'single'
				},
				{
					label: 'Warning date',
					altLabel: 'Warning date (Earliest)',
					section: 'Maritime Zone Warnings',
					type: 'date',
					id: 'warningDateFrom',
					groupId: 'warningDate',
					adjustWidth: 80,
					labelWidth: 162,
					shownOnly : ['Argo','OceanOPS'],
					placeholder: 'Earliest date'
				},
				{
					label: '',
					altLabel: 'Warning date (Latest)',
					adjustWidth: -80,
					labelWidth: 1,
					section: 'Maritime Zone Warnings',
					type: 'date',
					id: 'warningDateTo',
					groupId: 'warningDate',
					shownOnly : ['Argo','OceanOPS'],
					placeholder: 'Latest date'
				},
				{
					label: 'Last report date',
					altLabel: 'Last report date (Earliest)',
					section: 'Maritime Zone Warnings',
					type: 'date',
					id: 'warningLastReportDateFrom',
					groupId: 'lastReportDate',
					adjustWidth: 80,
					labelWidth: 162,
					shownOnly : ['Argo','OceanOPS'],
					placeholder: 'Earliest date'
				},
				{
					label: '',
					altLabel: 'Last report date (Latest)',
					adjustWidth: -80,
					labelWidth: 1,
					section: 'Maritime Zone Warnings',
					type: 'date',
					id: 'warningLastReportDateTo',
					groupId: 'lastReportDate',
					shownOnly: ['Argo','OceanOPS'],
					placeholder: 'Latest date'
				}
			]
