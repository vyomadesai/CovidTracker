import * as React from 'react';
import "./Table.css";
import numeral from "numeral";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

function TableS({ countries }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="table">
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
        <TableHead>
        <TableRow>
            <TableCell align="center">COUNTRIES</TableCell>
            <TableCell align="right">POPULATION</TableCell>
            <TableCell align="right">TOTAL NO OF CASES</TableCell>
            <TableCell align="right">ACTIVE CASES</TableCell>
            <TableCell align="right">RECOVERED CASES</TableCell>
            <TableCell align="right">DEATH CASES</TableCell>
          </TableRow>
        </TableHead>
          <TableBody>
          {countries.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((country, i) => (
            <TableRow hover role="checkbox" tabIndex={-1} key={i}>
              <TableCell align="center">
              {country.country}
              </TableCell>
              <TableCell align="right">
              {numeral(country.population).format("0,0")}
              </TableCell>
              <TableCell align="right">
              {numeral(country.cases).format("0,0")}
              </TableCell>
              <TableCell align="right">
              {numeral(country.active).format("0,0")}
              </TableCell>
              <TableCell align="right">
              {numeral(country.recovered).format("0,0")}
              </TableCell>
              <TableCell align="right">
              {numeral(country.deaths).format("0,0")}
              </TableCell>
            </TableRow>
             ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={countries.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default TableS;
