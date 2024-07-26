import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// import { useState } from 'react';
import React, { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Button,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Menu,
  MenuItem,
  Typography,
  FormControlLabel,
  Switch
} from '@mui/material';

// project imports
import BajajAreaChartCard from './BajajAreaChartCard';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const PopularCard = ({ isLoading }) => {
  const theme = useTheme();
  // const companies = [
  //   {
  //     name: 'Bajaj Firrrrnery',
  //     price: '$1839.00',
  //     change: '10% Profit'
  //   },
  //   {
  //     name: 'TTML',
  //     price: '$100.00',
  //     change: '10% Loss'
  //   },
  //   {
  //     name: 'Reliance',
  //     price: '$244400.00',
  //     change: '10% Profit'
  //   },
  //   {
  //     name: 'TTML',
  //     price: '$3333.00',
  //     change: '10% Loss'
  //   },
  //   {
  //     name: 'Stolon',
  //     price: '$18339.00',
  //     change: '10% Loss'
  //   }
  // ];

  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [users, setUsers] = useState([]);
  const [sortBy, setSortBy] = useState('amount_spent');
  const [displayType, setDisplayType] = useState('currency'); // Variable to hold display type

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
        // Change display type based on sortBy value
    setDisplayType(newValue === 'points_balance' ? 'number' : 'currency');
  };

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
     

  




         

          <CardContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid container alignContent="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h4">Top Users</Typography>
                  </Grid>
                  <Grid item>
                    <MoreHorizOutlinedIcon
                      fontSize="small"
                      sx={{
                        color: theme.palette.primary[200],
                        cursor: 'pointer'
                      }}
                      aria-controls="menu-popular-card"
                      aria-haspopup="true"
                      onClick={handleClick}
                    />
                    <Menu
                      id="menu-popular-card"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      variant="selectedMenu"
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                    >
                      <MenuItem onClick={handleClose}> Today</MenuItem>
                      <MenuItem onClick={handleClose}> This Month</MenuItem>
                      <MenuItem onClick={handleClose}> This Year </MenuItem>
                    </Menu>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ pt: '16px !important' }}>
            
            
              {users.length > 0 ? (
  <BajajAreaChartCard
    title={users[0].name}
    amount={displayType === 'currency' ? `$${parseInt(users[0].amount_spent).toLocaleString()}` : `${parseInt(users[0].points_balance).toLocaleString()} points`}
    profit="40% Profit"
  />
) : (
  <Typography variant="h6" color="textSecondary">Waiting for data...</Typography>
)}

</Grid>



              <Grid item xs={12}>
                <Grid container direction="column">
                  <FormControlLabel
                    control={<Switch checked={sortBy === 'points_balance'} onChange={handleSwitchChange} />}
                    label={sortBy === 'points_balance' ? 'Sort by Amount Spent' : 'Sort by Points Balance'}
                  />









{users.map((user) => (
  <CardContent key={user.id} sx={{ py: 0 }}>
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="subtitle1" sx={{ color: theme.palette.text.primary }}>
          {user.name}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary, display: 'flex', alignItems: 'center' }}>
 {/* Conditional rendering based on displayType */}
 {displayType === 'currency' ? (
                      `$${parseInt(user.amount_spent).toLocaleString()}`
                    ) : (
                      parseInt(user.points_balance).toLocaleString()
                    )}          {/* Always display arrow pointing up */}
          <Avatar
            variant="rounded"
            sx={{
              width: 16,
              height: 16,
              borderRadius: '5px',
              backgroundColor: theme.palette.success.light,
              color: theme.palette.success.dark,
              ml: 2
            }}
          >
            <KeyboardArrowUpOutlinedIcon fontSize="small" />
          </Avatar>
        </Typography>
      </Grid>
    </Grid>
    {/* Display change as increased */}
    <Typography
      variant="subtitle2"
      sx={{ color: theme.palette.success.dark, mt: 1 }}
    >
      Increased
    </Typography>
    <Divider sx={{ my: 1.5 }} />
  </CardContent>
))}


 <CardActions sx={{ justifyContent: 'center', p: 1.25 }}>
 <Button size="small" disableElevation onClick={() => navigate('/customer-list')}>
              View All
              <ChevronRightOutlinedIcon />
            </Button>
          </CardActions>









                  <Grid item>
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item>
                        <Typography variant="subtitle1" color="inherit">
                          Bajaj Firrrrnery
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Grid item>
                            <Typography variant="subtitle1" color="inherit">
                              $1839.00
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Avatar
                              variant="rounded"
                              sx={{
                                width: 16,
                                height: 16,
                                borderRadius: '5px',
                                backgroundColor: theme.palette.success.light,
                                color: theme.palette.success.dark,
                                ml: 2
                              }}
                            >
                              <KeyboardArrowUpOutlinedIcon fontSize="small" color="inherit" />
                            </Avatar>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Typography variant="subtitle2" sx={{ color: 'success.dark' }}>
                      10% Profit
                    </Typography>
                  </Grid>
                </Grid>
                <Divider sx={{ my: 1.5 }} />
                <Grid container direction="column">
                  <Grid item>
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item>
                        <Typography variant="subtitle1" color="inherit">
                          TTML
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Grid item>
                            <Typography variant="subtitle1" color="inherit">
                              $100.00
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Avatar
                              variant="rounded"
                              sx={{
                                width: 16,
                                height: 16,
                                borderRadius: '5px',
                                backgroundColor: theme.palette.orange.light,
                                color: theme.palette.orange.dark,
                                marginLeft: 1.875
                              }}
                            >
                              <KeyboardArrowDownOutlinedIcon fontSize="small" color="inherit" />
                            </Avatar>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.orange.dark }}>
                      10% loss
                    </Typography>
                  </Grid>
                </Grid>
                <Divider sx={{ my: 1.5 }} />
                <Grid container direction="column">
                  <Grid item>
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item>
                        <Typography variant="subtitle1" color="inherit">
                          Reliance
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Grid item>
                            <Typography variant="subtitle1" color="inherit">
                              $200.00
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Avatar
                              variant="rounded"
                              sx={{
                                width: 16,
                                height: 16,
                                borderRadius: '5px',
                                backgroundColor: theme.palette.success.light,
                                color: theme.palette.success.dark,
                                ml: 2
                              }}
                            >
                              <KeyboardArrowUpOutlinedIcon fontSize="small" color="inherit" />
                            </Avatar>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.success.dark }}>
                      10% Profit
                    </Typography>
                  </Grid>
                </Grid>
                <Divider sx={{ my: 1.5 }} />
                <Grid container direction="column">
                  <Grid item>
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item>
                        <Typography variant="subtitle1" color="inherit">
                          TTML
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Grid item>
                            <Typography variant="subtitle1" color="inherit">
                              $189.00
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Avatar
                              variant="rounded"
                              sx={{
                                width: 16,
                                height: 16,
                                borderRadius: '5px',
                                backgroundColor: theme.palette.orange.light,
                                color: theme.palette.orange.dark,
                                ml: 2
                              }}
                            >
                              <KeyboardArrowDownOutlinedIcon fontSize="small" color="inherit" />
                            </Avatar>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.orange.dark }}>
                      10% loss
                    </Typography>
                  </Grid>
                </Grid>
                <Divider sx={{ my: 1.5 }} />
                <Grid container direction="column">
                  <Grid item>
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item>
                        <Typography variant="subtitle1" color="inherit">
                          Stolon
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Grid item>
                            <Typography variant="subtitle1" color="inherit">
                              $189.00
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Avatar
                              variant="rounded"
                              sx={{
                                width: 16,
                                height: 16,
                                borderRadius: '5px',
                                backgroundColor: theme.palette.orange.light,
                                color: theme.palette.orange.dark,
                                ml: 2
                              }}
                            >
                              <KeyboardArrowDownOutlinedIcon fontSize="small" color="inherit" />
                            </Avatar>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.orange.dark }}>
                      10% loss
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
            <Button size="small" disableElevation>
              View All
              <ChevronRightOutlinedIcon />
            </Button>
          </CardActions>
        </MainCard>
      )}
    </>
  );
};

PopularCard.propTypes = {
  isLoading: PropTypes.bool
};

export default PopularCard;
