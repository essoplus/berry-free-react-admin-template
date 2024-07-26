import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, Select, MenuItem, InputLabel, FormControl, TextField, TableSortLabel, Button } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

const CampaignsPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');

  useEffect(() => {
    fetch(`http://localhost:3010/campaigns/${page}/${rowsPerPage}`)
      .then(response => response.json())
      .then(data => setCampaigns(data))
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

  const filteredCampaigns = campaigns.filter((campaign) =>
    Object.values(campaign).some((value) =>
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
    <MainCard title="Campaigns">
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
      <Button variant="contained" color="primary" sx={{ m: 1 }}>
        Create Campaign
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'id'}
                  direction={orderBy === 'id' ? order : 'asc'}
                  onClick={handleSort('id')}
                >
                  ID
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={handleSort('name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'start_date'}
                  direction={orderBy === 'start_date' ? order : 'asc'}
                  onClick={handleSort('start_date')}
                >
                  Start Date
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'end_date'}
                  direction={orderBy === 'end_date' ? order : 'asc'}
                  onClick={handleSort('end_date')}
                >
                  End Date
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'budget'}
                  direction={orderBy === 'budget' ? order : 'asc'}
                  onClick={handleSort('budget')}
                >
                  Budget
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'description'}
                  direction={orderBy === 'description' ? order : 'asc'}
                  onClick={handleSort('description')}
                >
                  Description
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'status'}
                  direction={orderBy === 'status' ? order : 'asc'}
                  onClick={handleSort('status')}
                >
                  Status
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'created_at'}
                  direction={orderBy === 'created_at' ? order : 'asc'}
                  onClick={handleSort('created_at')}
                >
                  Created At
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'target_audience'}
                  direction={orderBy === 'target_audience' ? order : 'asc'}
                  onClick={handleSort('target_audience')}
                >
                  Target Audience
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'channel'}
                  direction={orderBy === 'channel' ? order : 'asc'}
                  onClick={handleSort('channel')}
                >
                  Channel
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'campaign_start_time'}
                  direction={orderBy === 'campaign_start_time' ? order : 'asc'}
                  onClick={handleSort('campaign_start_time')}
                >
                  Campaign Start Time
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'campaign_end_time'}
                  direction={orderBy === 'campaign_end_time' ? order : 'asc'}
                  onClick={handleSort('campaign_end_time')}
                >
                  Campaign End Time
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'start_time'}
                  direction={orderBy === 'start_time' ? order : 'asc'}
                  onClick={handleSort('start_time')}
                >
                  Start Time
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'end_time'}
                  direction={orderBy === 'end_time' ? order : 'asc'}
                  onClick={handleSort('end_time')}
                >
                  End Time
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'currency_to_point_multiplier'}
                  direction={orderBy === 'currency_to_point_multiplier' ? order : 'asc'}
                  onClick={handleSort('currency_to_point_multiplier')}
                >
                  Currency to Point Multiplier
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCampaigns.map((campaign) => (
              <TableRow key={campaign.id}>
                <TableCell>{campaign.id}</TableCell>
                <TableCell>{campaign.name}</TableCell>
                <TableCell>{campaign.start_date}</TableCell>
                <TableCell>{campaign.end_date}</TableCell>
                <TableCell>{campaign.budget}</TableCell>
                <TableCell>{campaign.description}</TableCell>
                <TableCell>{campaign.status}</TableCell>
                <TableCell>{campaign.created_at}</TableCell>
                <TableCell>{campaign.target_audience}</TableCell>
                <TableCell>{campaign.channel}</TableCell>
                <TableCell>{campaign.campaign_start_time}</TableCell>
                <TableCell>{campaign.campaign_end_time}</TableCell>
                <TableCell>{campaign.start_time}</TableCell>
                <TableCell>{campaign.end_time}</TableCell>
                <TableCell>{campaign.currency_to_point_multiplier}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination count={10} page={page} onChange={handleChangePage} />
    </MainCard>
  );
};

export default CampaignsPage;
