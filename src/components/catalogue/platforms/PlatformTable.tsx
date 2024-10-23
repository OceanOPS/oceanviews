import React from 'react';
import CatalogueTable from '../../../shared/catalogueTable/CatalogueTable';

const platformColumns = [
  { label: 'Actions', key: 'actions', default: true },
  { label: 'Reference', key: 'ref', default: true },
  { label: 'Deployment Date', key: 'ptfDepl.deplDate', default: true },
  { label: 'Program', key: 'program.name', default: true },
  { label: 'Model', key: 'ptfModel.name', default: true },
  { label: 'Deployment Latitude', key: 'ptfDepl.lat', default: true },
  { label: 'Deployment Longitude', key: 'ptfDepl.lon', default: true },
  { label: 'Telecom Number', key: 'telecom.number', default: false },
  { label: 'Deployment Ship', key: 'ptfDepl.ship.name', default: false },
];

const PlatformTable: React.FC = () => {
  return (
    <CatalogueTable
      entity="Platform"
      apiUrl="https://www.ocean-ops.org/api/1/data/platform?exp=[%22ptfStatus.name=%27OPERATIONAL%27%20and%20ptfVariables.variable.nameShort=%27DOXY%27%22]&include=[%22ptfDepl%22,%22ptfDepl.ship%22,%22program%22,%22ptfModel%22,%22telecom%22]"
      columns={platformColumns}
    />
  );
};

export default PlatformTable;
