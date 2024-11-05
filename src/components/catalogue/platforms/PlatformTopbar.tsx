import React, { useState } from 'react';
import TopbarLayout from '../../../shared/TopbarLayout';
import { PlatformFilters, PlatformCategories } from './platformFilters';
import FilterDialog from '../../../shared/FilterDialog';

interface PlatformTopbarProps {
  filters: { [key: string]: any };
  onFilterChange: (filterKey: string, newValue: any) => void;
}

const PlatformTopbar: React.FC<PlatformTopbarProps> = ({ filters, onFilterChange }) => {
  const [filtersVisibility, setFiltersVisibility] = useState(() =>
    PlatformFilters.reduce((acc, filter) => {
      acc[filter.key] = filter.defaultDisplayed;
      return acc;
    }, {} as { [key: string]: boolean })
  );

  const toggleFilterVisibility = (filterKey: string) => {
    setFiltersVisibility((prev) => {
      const newVisibility = { ...prev, [filterKey]: !prev[filterKey] };

      // Clear the filter value when it is being hidden
      if (!newVisibility[filterKey]) {
        clearFilterValue(filterKey);
      }

      return newVisibility;
    });
  };

  const clearFilterValue = (filterKey: string) => {
    if (filters[filterKey]) {
      onFilterChange(filterKey, null); // Clear the filter value by setting it to null or an empty value
    }
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
        handleFilterChange={onFilterChange}
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
