import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, Select, MenuItem, InputLabel, FormControl, TextField, TableSortLabel } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');

  useEffect(() => {
    fetch(`http://localhost:3010/transactions/${page}/${rowsPerPage}`)
      .then(response => response.json())
      .then(data => setTransactions(data))
      .catch(error => console.error(error));
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (property) => () => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filteredTransactions = transactions.filter((transaction) =>
    Object.values(transaction).some((value) =>
      value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  ).sort((a, b) => {
    if (order === 'asc') {
      return a[orderBy] < b[orderBy] ? -1 : 1;
    } else {
      return a[orderBy] > b[orderBy] ? -1 : 1;
    }
  });

  return (
    <MainCard title="Transactions">
  <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
    <InputLabel id="rows-per-page-label" htmlFor="select-rows-per-page">Rows per page</InputLabel>
    <Select
      label="Rows per page"
      labelId="rows-per-page-label"
      id="select-rows-per-page"
      value={rowsPerPage}
      onChange={handleChangeRowsPerPage}
    >
      <MenuItem value={10}>10</MenuItem>
      <MenuItem value={20}>20</MenuItem>
      <MenuItem value={50}>50</MenuItem>
      <MenuItem value={100}>100</MenuItem>
    </Select>
      </FormControl>
      <TextField sx={{ m: 1 }} label="Search" variant="outlined" value={searchTerm} onChange={handleSearchChange} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel active={orderBy === 'id'} direction={order} onClick={handleSort('id')}>
                  ID
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel active={orderBy === 'customer_name'} direction={order} onClick={handleSort('customer_name')}>
                  Customer Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel active={orderBy === 'customer_id'} direction={order} onClick={handleSort('customer_id')}>
                  Customer ID
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel active={orderBy === 'transaction_date'} direction={order} onClick={handleSort('transaction_date')}>
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel active={orderBy === 'points_earned'} direction={order} onClick={handleSort('points_earned')}>
                  Points Earned
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel active={orderBy === 'points_redeemed'} direction={order} onClick={handleSort('points_redeemed')}>
                  Points Redeemed
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel active={orderBy === 'order_id'} direction={order} onClick={handleSort('order_id')}>
                  Order ID
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.id}</TableCell>
                <TableCell>{transaction.customer_name}</TableCell>
                <TableCell>{transaction.customer_id}</TableCell>
                <TableCell>{transaction.transaction_date}</TableCell>
                <TableCell>{transaction.points_earned}</TableCell>
                <TableCell>{transaction.points_redeemed}</TableCell>
                <TableCell>{transaction.order_id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination count={10} page={page} onChange={handleChangePage} />
    </MainCard>
  );
};

export default TransactionsPage;