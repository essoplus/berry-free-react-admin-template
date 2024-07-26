import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, Select, MenuItem, InputLabel, FormControl, TextField, TableSortLabel, Card, CardContent, Button, Avatar, Modal, Grid, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';
import { Link } from 'react-router-dom';
import maleAvatar from 'assets/images/users/male avatar.png';
import femaleAvatar from 'assets/images/users/female avatar.png';

const CustomerListPage = () => {
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [cardPosition, setCardPosition] = useState({ top: 0, left: 0 });
  const [leaveTimeout, setLeaveTimeout] = useState(null);
  const [customerDetails, setCustomerDetails] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3010/customers/${page}/${rowsPerPage}`)
      .then(response => response.json())
      .then(data => setCustomers(data))
      .catch(error => console.error(error));
  }, [page, rowsPerPage]);


 const handleNameClick = async (id) => {
  try {
    const response = await fetch(`http://localhost:3010/customers/${id}`);
    const data = await response.json();
    setCustomerDetails(data);
    setOpenModal(true);
  } catch (error) {
    console.error(error);
  }
};

  const handleCloseModal = () => {
    setOpenModal(false);
  };



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




  const filteredCustomers = customers.filter((customer) =>
    Object.values(customer).some((value) =>
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
    <MainCard title="Customer List">
    {/* Update FormControl with variant="outlined" to fix alignment */}
    <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="rows-per-page-label" htmlFor="select-rows-per-page">Rows per page</InputLabel>
      <Select
        label="Rows per page" // This ensures the label is displayed inside the border
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
                <TableSortLabel active={orderBy === 'name'} direction={order} onClick={handleSort('name')}>
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel active={orderBy === 'email'} direction={order} onClick={handleSort('email')}>
                  Email
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel active={orderBy === 'points_balance'} direction={order} onClick={handleSort('points_balance')}>
                  Points Balance
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel active={orderBy === 'phone_number'} direction={order} onClick={handleSort('phone_number')}>
                  Phone Number
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel active={orderBy === 'tier_id'} direction={order} onClick={handleSort('tier_id')}>
                  Tier ID
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.id}</TableCell>
                <TableCell
                onClick={() => handleNameClick(customer.id)}
                style={{ cursor: 'pointer' }}
                  onMouseEnter={(event) => {
                    clearTimeout(leaveTimeout);
                    setSelectedCustomer(customer);
                    setCardPosition({ top: event.clientY + 10, left: event.clientX + 10 });
                  }}
                  onMouseLeave={() => {
                    setLeaveTimeout(setTimeout(() => setSelectedCustomer(null), 500));
                  }}
                >
                  {customer.name}
                </TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.points_balance}</TableCell>
                <TableCell>{customer.phone_number}</TableCell>
                <TableCell>{customer.tier_id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination count={10} page={page} onChange={handleChangePage} />
      {selectedCustomer && (
        <Card
          style={{ 
            position: 'absolute', 
            top: cardPosition.top - 50, // Adjust the position so the card is closer to the cursor
            left: cardPosition.left - 50, 
            boxShadow: '0px 0px 10px rgba(0,0,0,0.5)' 
          }}
          onMouseEnter={() => clearTimeout(leaveTimeout)}
          onMouseLeave={() => {
            // Only set the timeout if the selectedCustomer is not null
            if (selectedCustomer) {
              setLeaveTimeout(setTimeout(() => setSelectedCustomer(null), 500));
            }
          }}
        >
          <CardContent>
            <Avatar 
              src={selectedCustomer.gender === 'male' ? maleAvatar : femaleAvatar} 
              sx={{ width: 100, height: 100, margin: '0 auto' }} // Adjust the size and center the image
            />
            <h2>{selectedCustomer.name}</h2>
            <p>Age: {selectedCustomer.age}</p>
            <p>Gender: {selectedCustomer.gender}</p>
            <p>Phone Number: {selectedCustomer.phone_number}</p>
            <Button component={Link} to={`/customer/${selectedCustomer.id}`}>
              View Full Profile
            </Button>
          </CardContent>
        </Card>
      )}
      

{selectedCustomer && (
  <Card>
    <CardContent>
      <p>Phone Number: {selectedCustomer.phone_number}</p>
      <Button component={Link} to={`/customer/${selectedCustomer.id}`}>
        View Full Profile
      </Button>
    </CardContent>
  </Card>
)}

{customerDetails && (
  <Modal
    open={openModal}
    onClose={handleCloseModal}
    aria-labelledby="customer-details-modal"
    aria-describedby="modal-with-customer-details"
  >
    <MainCard title="Customer Profile">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
        <Avatar 
            src={customerDetails.gender === 'male' ? maleAvatar : femaleAvatar} 
            sx={{ width: 100, height: 100, margin: '0 auto' }} // Adjust the size and center the image
          />
          <Typography variant="h4">{customerDetails.name}</Typography>
          <Typography variant="subtitle1">Active customer</Typography>
          <Button variant="contained" sx={{ margin: '8px' }}>
            ACTIONS
          </Button>
          <Button variant="outlined">
            SEE MORE PROFILE DETAILS
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
     
     
<List>
  <ListItem>
    <ListItemText primary="Email" secondary={customerDetails.email || 'N/A'} />
  </ListItem>
  <ListItem>
    <ListItemText primary="Points Balance" secondary={customerDetails.points_balance || 'N/A'} />
  </ListItem>
  <ListItem>
    <ListItemText primary="Phone Number" secondary={customerDetails.phone_number || 'N/A'} />
  </ListItem>
  <ListItem>
    <ListItemText primary="Tier ID" secondary={customerDetails.tier_id || 'N/A'} />
  </ListItem>
  <ListItem>
    <ListItemText primary="Birthday" secondary={customerDetails.birthday || 'N/A'} />
  </ListItem>
  <ListItem>
    <ListItemText primary="Gender" secondary={customerDetails.gender || 'N/A'} />
  </ListItem>
  <ListItem>
    <ListItemText primary="Registration Date" secondary={customerDetails.registration_day || 'N/A'} />
  </ListItem>
</List>

        </Grid>
        <Grid item xs={12}>
          <Divider />
          <CardContent>
            <Typography variant="h6">Timeline</Typography>
            {/* Map over transactions and display them */}
            {/* ... */}
          </CardContent>
        </Grid>
      </Grid>
    </MainCard>
  </Modal>
)}
</MainCard>

  );
};

export default CustomerListPage;