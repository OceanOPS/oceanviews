import React, { useState, useEffect } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, useTheme, Toolbar } from '@mui/material';
import TableActions from './TableActions';
import ColumnSelectorDialog from './ColumnSelectorDialog';
import ToolbarActions from './ToolbarActions';
import CatalogueTablePagination from './CatalogueTablePagination';

interface CatalogueTableProps {
  entity: string;
  apiUrl: string;
  columns: { label: string; key: string; default: boolean }[];
}

const CatalogueTable: React.FC<CatalogueTableProps> = ({ entity, apiUrl, columns }) => {
  const theme = useTheme();
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [selected, setSelected] = useState<string[]>([]);
  const [columnDialogOpen, setColumnDialogOpen] = useState(false);

  const [displayedColumns, setDisplayedColumns] = useState<string[]>(
    columns.filter(col => col.default).map(col => col.key)
  );

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((r) => {
        setData(r.data || []);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [apiUrl]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.ref);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleColumnToggle = (columnKey: string) => {
    setDisplayedColumns((prevColumns) =>
      prevColumns.includes(columnKey)
        ? prevColumns.filter((key) => key !== columnKey)
        : [...prevColumns, columnKey]
    );
  };

  return (
    <Box sx={{ height: 'calc(100vh - 72px)', overflow: 'hidden', padding: '10px 24px 24px 24px',
      backgroundColor: theme.palette.mode === 'light' ? '#f5f5f5' : '#1c1c1e', }}>
      <Paper sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>

        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <CatalogueTablePagination
            count={data.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <ToolbarActions entity={entity} handleColumnDialogOpen={() => setColumnDialogOpen(true)} />
        </Toolbar>

        <TableContainer sx={{ flexGrow: 1, overflowY: 'auto' }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={selected.length > 0 && selected.length < data.length}
                    checked={data.length > 0 && selected.length === data.length}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                {columns
                  .filter((col) => displayedColumns.includes(col.key))
                  .map((col) => (
                    <TableCell key={col.key} sx={{ fontWeight: 'bold' }}>
                      {col.label}
                    </TableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any, index: number) => {
                const isItemSelected = selected.indexOf(row.ref) !== -1;
                return (
                  <TableRow
                    key={index}
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox color="primary" checked={isItemSelected} />
                    </TableCell>
                    {displayedColumns.includes('actions') && <TableActions row={row} />}
                    {columns.filter(col => displayedColumns.includes(col.key)).map(col => (
                      <TableCell key={col.key}>{row[col.key]}</TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <ColumnSelectorDialog
          open={columnDialogOpen}
          columns={columns}
          displayedColumns={displayedColumns}
          handleColumnToggle={handleColumnToggle}
          onClose={() => setColumnDialogOpen(false)}
        />
      </Paper>
    </Box>
  );
};

export default CatalogueTable;
