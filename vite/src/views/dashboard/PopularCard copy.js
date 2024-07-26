import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { Avatar, Grid, Typography, Switch, FormControlLabel, CardContent, CircularProgress } from '@mui/material';

const PopularCard = ({ isLoading }) => {
  const theme = useTheme();
  const [users, setUsers] = useState([]);
  const [sortBy, setSortBy] = useState('points_balance');

  useEffect(() => {
    console.log('Fetching users with sortBy:', sortBy);
    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://localhost:3010/customers/top-users?limit=6&sortBy=${sortBy}`);
        const data = await response.json();
        setUsers(data);
        console.log('Data fetched:', data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    fetchUsers();
  }, [sortBy]); // Add sortBy as a dependency

  const handleSwitchChange = () => {
    const newValue = sortBy === 'points_balance' ? 'amount_spent' : 'points_balance';
    console.log('Button clicked, new value:', newValue);
    setSortBy(newValue);
  };

  // const handleSwitchChange = (event) => {
  //     console.log('Event checked:', event.target.checked);  // Log the direct event state
  //     const newValue = event.target.checked ? 'amount_spent' : 'points_balance';
  //     console.log('Switch toggled to:', newValue);
  //     setSortBy(newValue);
  // };

  return (
    <MainCard title="Popular Users" content={false}>
      <CardContent>
        <Grid container spacing={gridSpacing}>
          <Grid item></Grid>
          <Grid item xs={12}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h4">Top Users</Typography>
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={<Switch checked={sortBy === 'points_balance'} onChange={handleSwitchChange} />}
                  label={sortBy === 'points_balance' ? 'Sort by Amount Spent' : 'Sort by Points Balance'}
                />
              </Grid>
            </Grid>
          </Grid>
          {isLoading ? (
            <CircularProgress />
          ) : (
            users.map((user, index) => (
            <Grid item xs={12} key={index}>
    <Grid container spacing={2} alignItems="center">
        <Grid item>
            <Avatar variant="rounded" color="primary" sx={{ width: 48, height: 48 }}>
                {typeof user.name === 'string' ? user.name.charAt(0) : 'N/A'}
            </Avatar>
        </Grid>
        <Grid item sm zeroMinWidth>
            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                    <Typography variant="subtitle1">{user.name}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="caption" component="div" sx={{ color: theme.palette.secondary.dark }}>
                        {sortBy === 'amount_spent' ? `$${user.amount_spent}` : `${user.points_balance} points`}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
</Grid>
            ))
          )}
        </Grid>
      </CardContent>
    </MainCard>
  );
};

PopularCard.propTypes = {
  isLoading: PropTypes.bool
};

export default PopularCard;
