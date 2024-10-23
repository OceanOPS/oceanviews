import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Checkbox,
  IconButton,
  Button,
  Toolbar,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControlLabel,
  FormGroup,
  useTheme 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import ColumnIcon from '@mui/icons-material/ViewColumn';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useData } from './../../../DataContext';

const PlatformTable: React.FC = () => {
  const theme = useTheme(); 
  const { data, setData } = useData();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [selected, setSelected] = useState<string[]>([]);
  const [columnDialogOpen, setColumnDialogOpen] = useState(false);

  // Define all available columns and their keys
  const allColumns = [
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

  const [displayedColumns, setDisplayedColumns] = useState<string[]>(
    allColumns.filter(col => col.default).map(col => col.key)
  );

  useEffect(() => {
    fetch('https://www.ocean-ops.org/api/1/data/platform?exp=[%22ptfStatus.name=%27OPERATIONAL%27%20and%20ptfVariables.variable.nameShort=%27DOXY%27%22]&include=["ptfDepl","ptfDepl.ship","program","ptfModel","telecom"]')
      .then((response) => response.json())
      .then((r) => {
        setData(r.data || []);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data.map((n: any) => n.ref);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (ref: string) => {
    const selectedIndex = selected.indexOf(ref);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, ref);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (ref: string) => selected.indexOf(ref) !== -1;

  const handleColumnDialogOpen = () => {
    setColumnDialogOpen(true);
  };

  const handleColumnDialogClose = () => {
    setColumnDialogOpen(false);
  };

  const handleColumnToggle = (columnKey: string) => {
    setDisplayedColumns((prevColumns) =>
      prevColumns.includes(columnKey)
        ? prevColumns.filter((key) => key !== columnKey)
        : [...prevColumns, columnKey]
    );
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ height: 'calc(100vh - 72px)', overflow: 'hidden', padding: '10px 24px 24px 24px',
	backgroundColor: theme.palette.mode === 'light' ? '#f5f5f5' : '#1c1c1e', }}>
      <Paper sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>

        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TablePagination
              component="div"
              count={data.length || 0} 
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[25, 50, { value: -1, label: 'All' }]}
            />
          </Box>

          <Box>
            <Button
              variant="contained"
              color="info"
              startIcon={<ColumnIcon />}
              sx={{ marginRight: '8px' }}
              onClick={handleColumnDialogOpen}
            >
              Select columns
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              sx={{ marginRight: '8px' }}
              onClick={() => console.log('Add new row')}
            >
              Add Platform
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<FileDownloadIcon />}
              onClick={() => console.log('Export data')}
            >
              Export
            </Button>
          </Box>
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
                {allColumns
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
                const isItemSelected = isSelected(row.ref);
                return (
                  <TableRow
                    key={index}
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    selected={isItemSelected}
                    onClick={() => handleClick(row.ref)}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox color="primary" checked={isItemSelected} />
                    </TableCell>
                    {displayedColumns.includes('actions') && (
                      <TableCell>
                        <IconButton sx={{ padding: '2px 6px' }} onClick={() => console.log('Inspect', row)}>
                          <VisibilityIcon sx={{ padding: '2px' }} />
                        </IconButton>
                        <IconButton sx={{ padding: '2px 6px' }} onClick={() => console.log('Edit', row)}>
                          <EditIcon sx={{ padding: '2px' }} />
                        </IconButton>
                        <IconButton sx={{ padding: '2px 6px' }} onClick={() => console.log('Delete', row)}>
                          <DeleteIcon sx={{ padding: '2px' }} />
                        </IconButton>
                      </TableCell>
                    )}
                    {displayedColumns.includes('ref') && <TableCell>{row.ref}</TableCell>}
                    {displayedColumns.includes('ptfDepl.deplDate') && <TableCell>{row.ptfDepl?.deplDate}</TableCell>}
                    {displayedColumns.includes('program.name') && <TableCell>{row.program?.name}</TableCell>}
                    {displayedColumns.includes('ptfModel.name') && <TableCell>{row.ptfModel?.name}</TableCell>}
                    {displayedColumns.includes('ptfDepl.lat') && <TableCell>{row.ptfDepl?.lat}</TableCell>}
                    {displayedColumns.includes('ptfDepl.lon') && <TableCell>{row.ptfDepl?.lon}</TableCell>}
                    {displayedColumns.includes('telecom.number') && <TableCell>{row.telecom?.number}</TableCell>}
                    {displayedColumns.includes('ptfDepl.ship.name') && <TableCell>{row.ptfDepl?.ship?.name}</TableCell>}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog open={columnDialogOpen} onClose={handleColumnDialogClose}>
        <DialogTitle>Select Columns</DialogTitle>
        <DialogContent>
          <FormGroup>
            {allColumns.map((column) => (
              <FormControlLabel
                key={column.key}
                control={
                  <Checkbox
                    checked={displayedColumns.includes(column.key)}
                    onChange={() => handleColumnToggle(column.key)}
                  />
                }
                label={column.label}
              />
            ))}
          </FormGroup>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default PlatformTable;
