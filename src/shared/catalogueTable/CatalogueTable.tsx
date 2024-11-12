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
  field: string;
  aggStringProp?: string;
  noSorting?: boolean;
}

interface CatalogueTableProps {
  entity: string;
  apiUrl: string;
  columns: Column[];
  filters: { [key: string]: any }; 
}

const getNestedValue = (obj: any, path: string, aggProp?: string): any => {
  const value = path.split('.').reduce((acc, part) => acc && acc[part], obj);
  if (Array.isArray(value) && aggProp) {
    return value.map((item) => item[aggProp]).join(', ');
  }
  return value;
};

const CatalogueTable: React.FC<CatalogueTableProps> = ({ entity, apiUrl, columns, filters }) => {
  const theme = useTheme();
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [selected, setSelected] = useState<string[]>([]);
  const [columnDialogOpen, setColumnDialogOpen] = useState(false);
  const [sortOptions, setSortOptions] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const [displayedColumns, setDisplayedColumns] = useState<string[]>(
    columns.filter(col => col.default).map(col => col.key)
  );

  const fields = useMemo(() => {
    return columns
      .filter(col => displayedColumns.includes(col.key) && col.field)
      .map(col => col.field)
      .join(',');
  }, [displayedColumns, columns]);

  const filterString = useMemo(() => {
	const filterObject: { [key: string]: any } = {};
  
	Object.entries(filters).forEach(([key, value]) => {
		if (value != null && (Array.isArray(value) ? value.length > 0 : true)) {
			if (Array.isArray(value)) {
			  if (typeof value[0] === 'object' && 'value' in value[0]) {
				filterObject[key] = value.map((item: any) => item.value).join(',');
			  } else {
				filterObject[key] = value.join(',');
			  }
			} else if (typeof value === 'object' && 'value' in value && value.value != null) {
			  filterObject[key] = value.value;
			} else {
			  filterObject[key] = value;
			}
		}
	});
  
	return encodeURIComponent(JSON.stringify(filterObject));
  }, [filters]);
  
  const permalinkUrl = useMemo(() => {
	const url = new URL(apiUrl);
	const params = new URLSearchParams();
  
	// Add fields, filters, and sort parameters
	if (fields) params.set('fields', fields);
	if (sortOptions) params.set('sort', sortOptions);
	if (filterString) params.set('filters', filterString);
  
	// Only set search once at the end to avoid double question marks
	url.search = params.toString();
	return url.toString();
  }, [apiUrl, fields, sortOptions, filterString]);
  

  useEffect(() => {
	let isLatestRequest = true; 
	const controller = new AbortController();
	const signal = controller.signal;
  
	const fetchData = async () => {
	  setLoading(true);
	  try {
		const response = await fetch(`${apiUrl}?page=${page + 1}&pageSize=${rowsPerPage}&fields=${fields}&sort=${sortOptions}&filters=${filterString}`, { signal });
		const result = await response.json();
  
		if (isLatestRequest) { 
		  setData(result.data || []);
		  setTotal(result.total || 0);
		}
	  } catch (error) {
		if (error instanceof Error) {
		  console.error('Error fetching data:', error.message);
		} else {
		  console.error('An unknown error occurred:', error);
		}
	  } finally {
		if (isLatestRequest) { 
		  setLoading(false);
		}
	  }
	};
  
	fetchData();
  
	return () => {
	  isLatestRequest = false; 
	  controller.abort();
	};
  }, [apiUrl, page, rowsPerPage, fields, sortOptions, filterString]);
  
  

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

  const handleSortChange = (field: string, direction: 'asc' | 'desc' | null) => {
    setPage(0);
    setSortOptions((prevSort) => {
      const sortArr = prevSort ? prevSort.split(',') : [];
      const existingIndex = sortArr.findIndex((s) => s.startsWith(`${field}:`));

      if (existingIndex >= 0) {
        sortArr.splice(existingIndex, 1);
      }

      if (direction) {
        sortArr.push(`${field}:${direction}`);
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
          <ToolbarActions entity={entity} handleColumnDialogOpen={() => setColumnDialogOpen(true)} permalinkUrl={permalinkUrl}  />
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
