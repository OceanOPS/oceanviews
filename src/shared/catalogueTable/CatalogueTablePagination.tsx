import React from 'react';
import { TablePagination, Box } from '@mui/material';

interface CatalogueTablePaginationProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CatalogueTablePagination: React.FC<CatalogueTablePaginationProps> = ({
  count, page, rowsPerPage, onPageChange, onRowsPerPageChange,
}) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <TablePagination
        component="div"
        count={count}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={[25, 50, { value: -1, label: 'All' }]}
      />
    </Box>
  );
};

export default CatalogueTablePagination;
