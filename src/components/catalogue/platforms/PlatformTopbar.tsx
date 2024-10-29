import React, { useState } from 'react';
import TopbarLayout from '../../../shared/TopbarLayout';
import { PlatformFilters, PlatformCategories } from './platformFilters';
import FilterDialog from '../../../shared/FilterDialog'; 

const PlatformTopbar: React.FC = () => {

  const [filtersVisibility, setFiltersVisibility] = useState(() =>
    PlatformFilters.reduce((acc, filter) => {
      acc[filter.key] = filter.defaultDisplayed;
      return acc;
    }, {} as { [key: string]: boolean })
  );

  const toggleFilterVisibility = (filterKey: string) => {
    setFiltersVisibility((prev) => ({
      ...prev,
      [filterKey]: !prev[filterKey],
    }));
  };

  const [filters, setFilters] = useState<{ [key: string]: any }>({
    network: [],
    country: [],
  });

  const handleFilterChange = (filterKey: string, newValue: any) => {
    setFilters((prev) => ({
      ...prev,
      [filterKey]: newValue,
    }));
  };

  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const displayedFilters = PlatformFilters.filter((filter) => filtersVisibility[filter.key]);

  return (
    <>
      <TopbarLayout
        onOpenModal={openModal}
        displayedFilters={displayedFilters}
        filters={filters}
        handleFilterChange={handleFilterChange}
      />
      <FilterDialog
        open={modalOpen}
        onClose={closeModal}
        filtersVisibility={filtersVisibility}
        toggleFilterVisibility={toggleFilterVisibility}
        filters={PlatformFilters}
        categories={PlatformCategories}
      />
    </>
  );
};

export default PlatformTopbar;
