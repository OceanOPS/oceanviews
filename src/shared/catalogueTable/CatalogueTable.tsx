import React, { useState, useEffect, useMemo } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, useTheme, Toolbar, CircularProgress } from '@mui/material';
import ColumnSelectorDialog from './ColumnSelectorDialog';
import ToolbarActions from './ToolbarActions';
import CatalogueTablePagination from './CatalogueTablePagination';

interface Column {
  label: string;
  key: string;
  default: boolean;
  width?: number;
  group?: string;
  field?: string;
  aggStringProp?: string;
  noSorting?: boolean;
}

interface CatalogueTableProps {
  entity: string;
  apiUrl: string;
  columns: Column[];
}

const getNestedValue = (obj: any, path: string, aggProp?: string): any => {
  const value = path.split('.').reduce((acc, part) => acc && acc[part], obj);
  
  if (Array.isArray(value) && aggProp) {
    return value.map((item) => item[aggProp]).join(', ');
  }
  return value;
};

const CatalogueTable: React.FC<CatalogueTableProps> = ({ entity, apiUrl, columns }) => {
  const theme = useTheme();
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [selected, setSelected] = useState<string[]>([]);
  const [columnDialogOpen, setColumnDialogOpen] = useState(false);
  const [sortOptions, setSortOptions] = useState<string>(''); 
  const [loading, setLoading] = useState(true); // New state for loading

  const [displayedColumns, setDisplayedColumns] = useState<string[]>(
    columns.filter(col => col.default).map(col => col.key)
  );

  const fields = useMemo(() => {
    return columns
      .filter(col => displayedColumns.includes(col.key) && col.field)
      .map(col => col.field)
      .join(',');
  }, [displayedColumns, columns]);

  useEffect(() => {
    setLoading(true); // Start loading
    fetch(`${apiUrl}?page=${page + 1}&pageSize=${rowsPerPage}&fields=${fields}&sort=${sortOptions}`)
      .then((response) => response.json())
      .then((r) => {
        console.log("Fetched data:", r);
        setData(r.data || []);
        setTotal(r.total || 0);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setLoading(false); // End loading
      });
  }, [apiUrl, page, rowsPerPage, fields, sortOptions]);

  const handleChangePage = (_event: unknown, newPage: number) => {
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

  const handleSortChange = (key: string, direction: 'asc' | 'desc' | null) => {
    setPage(0);
    setSortOptions((prevSort) => {
      const sortArr = prevSort ? prevSort.split(',') : [];
      const existingIndex = sortArr.findIndex((s) => s.startsWith(`${key}:`));

      if (existingIndex >= 0) {
        sortArr.splice(existingIndex, 1);
      }

      if (direction) {
        sortArr.push(`${key}:${direction}`);
      }

      return sortArr.join(',');
    });
  };

  return (
    <Box sx={{ height: '100%', overflow: 'hidden', padding: '10px 24px 24px 24px',
      backgroundColor: theme.palette.mode === 'light' ? '#f5f5f5' : '#1c1c1e', position: 'relative' }}>
      
      {loading && (
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          zIndex: 1,
        }}>
          <CircularProgress />
        </Box>
      )}

      <Paper sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <CatalogueTablePagination
            count={total}
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
                    <TableCell key={col.key} sx={{
                        fontWeight: 'bold',
                        width: col.width ? `${col.width}px` : 'auto',
                      }}>
                      {col.label}
                    </TableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row: any, index: number) => {
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
                    {columns.filter(col => displayedColumns.includes(col.key)).map(col => {
                      const value = getNestedValue(row, col.key, col.aggStringProp);
                      return (
                        <TableCell key={col.key} sx={{ width: col.width ? `${col.width}px` : 'auto' }}>
                          {value !== undefined ? value : '-'}
                        </TableCell>
                      );
                    })}
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
          onSortChange={handleSortChange}
          onClose={() => setColumnDialogOpen(false)}
        />
      </Paper>
    </Box>
  );
};

export default CatalogueTable;
