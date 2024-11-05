import React from 'react';
import CatalogueTable from '../../../shared/catalogueTable/CatalogueTable';
import config from '../../../config';

const platformColumns = [
  { label: 'Row', key: 'row', default: true, group: 'General', width: 45, noSorting: true },
  { label: 'Reference', key: 'ref', default: true, group: 'General', field: 'ref' },
  { label: 'Status', key: 'status.name', default: true, group: 'General', field: 'status' },
  { label: 'Class-Category', key: 'class_categories', aggStringProp: 'name', default: false, group: 'Affiliations', field: 'classCategory' },
  { label: 'Name', key: 'name', default: false, group: 'General', field: 'name' },
  { label: 'Site', key: 'site', aggStringProp: 'name', default: false, group: 'Affiliations', field: 'site' },
  { label: 'Area of operation', key: 'area', aggStringProp: 'name', default: false, group: 'Affiliations', field: 'area' },
  { label: 'Observing networks', key: 'observing_networks', aggStringProp: 'name', default: true, group: 'Affiliations', field: 'observingNetworks' },
  { label: 'Networks', key: 'networks', aggStringProp: 'name', default: false, group: 'Affiliations', field: 'networks' },
  { label: 'Program', key: 'program.name', default: true, group: 'Affiliations', field: 'programName' },
  { label: 'Country', key: 'program.country.name', default: true, group: 'Affiliations', field: 'country' },
  { label: 'Model', key: 'model.name', default: true, group: 'General', field: 'model' },
  { label: 'Type', key: 'model.type.name', default: false, group: 'General', field: 'type' },
  { label: 'Family', key: 'model.type.family.name', default: false, group: 'General', field: 'family' },
  { label: 'Manufacturer', key: 'model.manufacturer.name', default: false, group: 'General', field: 'manufacturer', noSorting: true },
  { label: 'Deployment Date', key: 'deployment.date', default: true, group: 'Deployment', field: 'deplDate' },
  { label: 'Deployment Method', key: 'deployment.method.name', default: false, group: 'Deployment', field: 'deplType' },
  { label: 'Ship name', key: 'deployment.ship.name', default: false, group: 'Deployment Ship', field: 'deplShip' },
  { label: 'Vessel Type', key: 'deployment.ship.type.name', default: false, group: 'Deployment Ship', field: 'shipType' },
  { label: 'Deployment Latitude', key: 'deployment.latitude', default: true, group: 'Deployment', field: 'deplLat' },
  { label: 'Deployment Longitude', key: 'deployment.longitude', default: true, group: 'Deployment', field: 'deplLon' },
  { label: 'Deployment Country', key: 'deployment.country.name', default: false, group: 'Deployment', field: 'deplCountryName' },
  { label: 'Max mooring depth', key: 'hardware.max_mooring_depth', default: false, group: 'Deployment', field: 'maxMooringDepth' },
  { label: 'Battery', key: 'hardware.battery.name', default: false, group: 'Hardware', field: 'batteryName' },
  { label: 'Control board', key: 'hardware.control_board', default: false, group: 'Hardware', field: 'fwCtrlBoard' },
  { label: 'Board serial N°', key: 'hardware.control_board_serial_number', default: false, group: 'Hardware', field: 'fwSerialRef' },
  { label: 'Software version', key: 'hardware.software_version', default: false, group: 'Hardware', field: 'fwSoftVersion', noSorting: true },
  { label: 'Software format', key: 'hardware.format_ref', default: false, group: 'Hardware', field: 'fwFormatRef' },
  { label: 'Cruise name', key: 'deployment.cruise.name', default: false, group: 'Deployment Ship', field: 'cruiseName' },
  { label: 'Cruise reference', key: 'deployment.cruise.ref', default: false, group: 'Deployment Ship', field: 'cruiseRef' },
  { label: 'Cruise line', key: 'deployment.cruise.line', aggStringProp: 'name', default: false, group: 'Deployment Ship', field: 'cruiseLine' },
  { label: 'Deployment Score', key: 'deployment.score', default: false, group: 'Deployment', field: 'score' },
  { label: 'ICES Code', key: 'deployment.ship.ices_code', default: false, group: 'Deployment Ship', field: 'shipICES' },
  { label: 'IMO number', key: 'deployment.ship.imo_number', default: false, group: 'Deployment Ship', field: 'shipIMO' },
  { label: 'Call Sign', key: 'deployment.ship.call_sign', default: false, group: 'Deployment Ship', field: 'shipCallSign' },
  { label: 'Telecom number', key: 'telecom.number', default: false, group: 'Telecom', field: 'telNum' },
  { label: 'Telecom type', key: 'telecom.type.name', default: false, group: 'Telecom', field: 'telType' },
  { label: 'Telecom IMEI', key: 'telecom.imei', default: false, group: 'Telecom', field: 'imei' },
  { label: 'Telecom start date', key: 'telecom.start_date', default: false, group: 'Telecom', field: 'telecomStartDate' },
  { label: 'Telecom end date', key: 'telecom.end_date', default: false, group: 'Telecom', field: 'telecomEndDate' },
  { label: 'Tracking system', key: 'telecom.tracking_system.name', default: false, group: 'Telecom', field: 'trackingSystemName', noSorting: true },
  { label: 'Retrieval start date', key: 'retrieval.start_date', default: false, group: 'Retrieval', field: 'retrievalStartDate', noSorting: true },
  { label: 'Retrieval end date', key: 'retrieval.end_date', default: false, group: 'Retrieval', field: 'retrievalEndDate', noSorting: true },
  { label: 'Recovery latitude', key: 'retrieval.latitude', default: false, group: 'Retrieval', field: 'retrievalLat' },
  { label: 'Recovery longitude', key: 'retrieval.longitude', default: false, group: 'Retrieval', field: 'retrievalLon' },
  { label: 'Retrieval ship', key: 'retrieval.ship.name', default: false, group: 'Retrieval', field: 'retrievalShipName', noSorting: true },
  { label: 'GTS-ID', key: 'identifiers.gts_id', default: false, group: 'Identifiers', field: 'wmoId' },
  { label: 'Serial number', key: 'identifiers.serial_number', default: false, group: 'Identifiers', field: 'serialNo' },
  { label: 'Internal ID', key: 'identifiers.internal_id', default: false, group: 'Identifiers', field: 'internalId' },
  { label: 'WIGOS ID', key: 'identifiers.wigos_id', default: false, group: 'Identifiers', field: 'wigosId' },
  { label: 'Cycle time', key: 'configuration.cycle_time', default: false, group: 'Configuration', field: 'cycleTime', noSorting: true },
  { label: 'Drift pressure', key: 'configuration.drift_pressure', default: false, group: 'Configuration', field: 'driftPress', noSorting: true },
  { label: 'Profile pressure', key: 'configuration.profile_pressure', default: false, group: 'Configuration', field: 'profilePress', noSorting: true },
  { label: 'Ice detection', key: 'configuration.has_ice_detection_software', default: false, group: 'Configuration', field: 'iceDetect', noSorting: true },
  { label: 'Last location date', key: 'location.date', default: false, group: 'Last location', field: 'lastLocDate' },
  { label: 'Last location latitude', key: 'location.latitude', default: false, group: 'Last location', field: 'lastLocLat' },
  { label: 'Last location longitude', key: 'location.longitude', default: false, group: 'Last location', field: 'lastLocLon' },
  { label: 'Latest cycle', key: 'observation.cycle_number', default: false, group: 'Last location', field: 'lastObsCycleNb' },
  { label: 'Sensor models', key: 'sensor_lists.models', default: false, group: 'Sensors', field: 'sensors' },
  { label: 'Sensor serials', key: 'sensor_lists.serials', default: false, group: 'Sensors', field: 'sensorSerials' },
  { label: 'Sensor variables', key: 'sensor_lists.variables', default: false, group: 'Sensors', field: 'sensorvariables' },
  { label: 'Sensor heights', key: 'sensor_lists.heights', default: false, group: 'Sensors', field: 'sensorHeights' },
  { label: 'Has drogue', key: 'hardware.has_drogue', default: false, group: 'Sensors', field: 'drogue' },
  { label: 'E-Notification date', key: 'e_notification_date', default: false, group: 'Other', field: 'eNotifDate' },
  { label: 'Age (days)', key: 'age', default: false, group: 'Other', field: 'age', noSorting: true },
  { label: 'Blacklisted', key: 'is_blacklisted', default: false, group: 'Other', field: 'blacklisted' },
  { label: 'Data status', key: 'data_status.name', default: false, group: 'Other', field: 'dataStatus' },
  { label: 'Data path', key: 'platform_data_links.data_url', default: false, group: 'Other', field: 'dataPath' },
];

interface PlatformTableProps {
	filters: { [key: string]: any };
  }

const PlatformTable: React.FC<PlatformTableProps> = ({ filters }) => {
  return (
    <CatalogueTable
      entity="Platform"
      apiUrl={`${config.apiRoot}/data/oceanjson/platforms`}
      columns={platformColumns}
	  filters={filters}
    />
  );
};

export default PlatformTable;

