// import React, { useEffect, useState } from 'react';
import React, { useEffect,  useState } from 'react';
import { InputLabel, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Snackbar } from '@mui/material';
import Pagination from '@mui/material/Pagination';
// import Grow from '@material-ui/core/Grow';
// import Slide from '@material-ui/core/Slide';
import Alert from '@mui/material/Alert';
import { FormControl, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { Select, MenuItem } from '@mui/material';
import { Paper } from '@mui/material';
const TiersPage = () => {
    // const [snackbar, setSnackbar] = useState({ open: false, message: '' });
    const [tiers, setTiers] = useState([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('id');
    // const handleSnackbarClose = () => {
    //     setSnackbar({ ...snackbar, open: false });
    // };
    const [tierGroups, setTierGroups] = useState([]);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [newTierData, setNewTierData] = useState({
        tier_name: '',
        points_required: '',
        point_multiplier: '',
        benefits: '',
        group_name: '',
        is_default: false,
        group_id: '',
        icon_url: '',
        image_url: ''
    });


    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');


    const handleCreateDialogOpen = () => setOpenCreateDialog(true);
    const handleCreateDialogClose = () => {
            setOpenCreateDialog(false);
            resetNewTierData();
    };


  
const resetNewTierData = () => {
    console.log('Resetting newTierData');
    setNewTierData({ tier_name: '', points_required: '', point_multiplier: '', benefits: '', group_name: '' });
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

    const filteredTiers = tiers.filter((tier) =>
        Object.values(tier).some((value) =>
            value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    ).sort((a, b) => {
        if (order === 'asc') {
            return a[orderBy] < b[orderBy] ? -1 : 1;
        } else {
            return a[orderBy] > b[orderBy] ? -1 : 1;
        }
    });


  


    const isFormValid = () => {
            return newTierData.tier_name && newTierData.points_required && newTierData.point_multiplier;
    };

    const handleSubmit = async (event) => {
            event.preventDefault();
            if (!isFormValid()) {


                setSnackbarMessage('Please fill in all required fields.');
                setSnackbarOpen(true);


                return;
            }
            try {
                    const response = await fetch('http://localhost:3010/tiers/tiers', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(newTierData)
                    });
                    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
                    const createdTier = await response.json();
                    setTiers(tiers.concat(createdTier));
                    handleCreateDialogClose();
            } catch (error) {
                    console.error('Error creating tier:', error);
                    alert('Error creating tier.');
            }
    };

    
const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'group_name') {
        const selectedGroup = tierGroups.find(group => group.group_id === value);
        if (selectedGroup) {
            setNewTierData({ ...newTierData, group_name: selectedGroup.group_name, group_id: value });
        } else {
            console.error('selectedGroup is undefined');
        }
    } else {
        setNewTierData({ ...newTierData, [name]: value });
    }
};
    
       useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:3010/tiers/tiers?page=${page}&limit=${rowsPerPage}`);
            const data = await response.json();
            setTiers(data);
        } catch (error) {
            console.error(error);
        }
    };

    fetchData();
}, [page, rowsPerPage]);
            
// Fetch tier groups
useEffect(() => {
    fetch(`http://localhost:3010/tiers/tier_groups?page=1&limit=10`)
        .then(response => response.json())
        .then(data => {
            // Log the fetched data
            console.log('Fetched tier groups:', data);

            // Check for undefined or null group names
            if (data.some(group => group.group_name === undefined || group.group_name === null)) {
                console.error('Undefined or null group name found in tier groups');
            }

            setTierGroups(data);

            // Log the value of newTierData.group_name
            console.log('newTierData.group_name:', newTierData.group_name);

            // If newTierData.group_name doesn't match any group_name in data, set it to ''
            if (!data.some(group => group.group_name === newTierData.group_name)) {
                console.log('newTierData.group_name does not match any group_name in data');
                setNewTierData(prevData => ({ ...prevData, group_name: '' }));
            }
        })
        .catch(error => console.error(error));
}, []);

      const handleChangePage = (event, newPage) => {
    setPage(newPage );
};
    
    // Add these new state variables
const [openCreateGroupDialog, setOpenCreateGroupDialog] = useState(false);
const [newGroupData, setNewGroupData] = useState({
    group_name: '',
    description: '',
    icon_url: '',
    image_url: ''
});

// Add these new functions
const handleCreateGroupDialogOpen = () => setOpenCreateGroupDialog(true);
const handleCreateGroupDialogClose = () => {
    setOpenCreateGroupDialog(false);
    resetNewGroupData();
};
const resetNewGroupData = () => {
    setNewGroupData({ group_name: '', description: '', icon_url: '', image_url: '' });
};


const handleGroupSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await fetch('http://localhost:3010/tiers/tier_groups', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newGroupData)
        });
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        const createdGroup = await response.json();
        setTierGroups(tierGroups.concat(createdGroup));
        handleCreateGroupDialogClose();
    } catch (error) {
        console.error('Error creating tier group:', error);
        alert('Error creating tier group.');
    }
};

const handleGroupChange = (event) => {
    const { name, value } = event.target;
    setNewGroupData({ ...newGroupData, [name]: value });
};



//   TransitionComponent={Grow}
//   TransitionComponent={Slide}

 
      return (
        <MainCard title="Tiers">
          <Snackbar
  open={snackbarOpen}
  autoHideDuration={6000}
  onClose={() => setSnackbarOpen(false)}
  message={snackbarMessage}
  >

<Alert onClose={() => setSnackbarOpen(false)} severity="error">
    {snackbarMessage}
  </Alert>
  </Snackbar>
<FormControl variant="outlined" sx={{ m:1 , minWidth: 120, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
<InputLabel id="rows-per-page-label" htmlFor="select-rows-per-page">Rows per page</InputLabel>
    <Select
      label="Rows per page"
      labelId="rows-per-page-label"
      id="select-rows-per-page"
      value={rowsPerPage}
      onChange={handleChangeRowsPerPage}
      sx={{ minWidth: 120 }}
   >     
<MenuItem value={10}>10</MenuItem>
<MenuItem value={20}>20</MenuItem>
<MenuItem value={30}>30</MenuItem>
<MenuItem value={100}>100</MenuItem>

</Select>

<TextField sx={{ m: 1 }} label="Search" variant="outlined" value={searchTerm} onChange={handleSearchChange} />



<Button variant="contained" onClick={handleCreateDialogOpen} sx={{ m: 1, alignSelf: 'flex-center' }}>
            Create Tier
 </Button>

 <Button variant="contained" onClick={handleCreateGroupDialogOpen} sx={{ m: 1, alignSelf: 'flex-center' }}>
    Create Tier Group
</Button>


</FormControl>
          
    








<Dialog open={openCreateGroupDialog} onClose={handleCreateGroupDialogClose}>
    <DialogTitle>Create New Tier Group</DialogTitle>
    <DialogContent>
        <TextField
            margin="dense"
            label="Group Name"
            type="text"
            fullWidth
            variant="standard"
            name="group_name"
            value={newGroupData.group_name}
            onChange={handleGroupChange}
        />
        <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            name="description"
            value={newGroupData.description}
            onChange={handleGroupChange}
        />
        <TextField
            margin="dense"
            label="Icon URL"
            type="text"
            fullWidth
            variant="standard"
            name="icon_url"
            value={newGroupData.icon_url}
            onChange={handleGroupChange}
        />
        <TextField
            margin="dense"
            label="Image URL"
            type="text"
            fullWidth
            variant="standard"
            name="image_url"
            value={newGroupData.image_url}
            onChange={handleGroupChange}
        />
    </DialogContent>
    <DialogActions>
        <Button onClick={handleCreateGroupDialogClose}>Cancel</Button>
        <Button onClick={handleGroupSubmit} color="primary">
            Create
        </Button>
    </DialogActions>
</Dialog>




          <Dialog open={openCreateDialog} onClose={handleCreateDialogClose}>
            <DialogTitle>Create New Tier</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                label="Tier Name"
                type="text"
                fullWidth
                variant="standard"
                name="tier_name"
                value={newTierData.tier_name}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                label="Points Required"
                type="number"
                fullWidth
                variant="standard"
                name="points_required"
                value={newTierData.points_required}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                label="Point Multiplier"
                type="number"
                fullWidth
                variant="standard"
                name="point_multiplier"
                value={newTierData.point_multiplier}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                label="Benefits"
                type="text"
                fullWidth
                variant="standard"
                name="benefits"
                value={newTierData.benefits}
                onChange={handleChange}
              />
               
               


<TextField
    margin="dense"
    label="Is Default"
    type="checkbox"
    fullWidth
    variant="standard"
    name="is_default"
    value={newTierData.is_default}
    onChange={handleChange}
/>
<FormControl variant="outlined" margin="dense" fullWidth>
    <InputLabel id="group-name-label">Group Name</InputLabel>
    <Select
        labelId="group-name-label"
        id="group-name"
        name="group_name"
        value={newTierData.group_id}
        onChange={handleChange}
        label="Group Name"
    >
        {tierGroups.map((group) => (
  <MenuItem key={group.group_id} value={group.group_id}>
    {group.group_name}
</MenuItem>
))}
    </Select>
</FormControl>
<TextField
    margin="dense"
    label="Icon URL"
    type="text"
    fullWidth
    variant="standard"
    name="icon_url"
    value={newTierData.icon_url}
    onChange={handleChange}
/>
<TextField
    margin="dense"
    label="Image URL"
    type="text"
    fullWidth
    variant="standard"
    name="image_url"
    value={newTierData.image_url}
    onChange={handleChange}
/>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCreateDialogClose}>Cancel</Button>
              <Button onClick={handleSubmit} color="primary">
                Create
              </Button>
            </DialogActions>
          </Dialog>
    
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'id'}
                      direction={order}
                      onClick={handleSort('id')}
                    >
                      ID
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'tier_name'}
                      direction={order}
                      onClick={handleSort('tier_name')}
                    >
                      Tier Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'points_required'}
                      direction={order}
                      onClick={handleSort('points_required')}
                    >
                      Points Required
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'point_multiplier'}
                      direction={order}
                      onClick={handleSort('point_multiplier')}
                    >
                      Point Multiplier
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'benefits'}
                      direction={order}
                      onClick={handleSort('benefits')}
                    >
                      Benefits
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'group_name'}
                      direction={order}
                      onClick={handleSort('group_name')}
                    >
                      Group Name
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTiers.map((tier) => (
                  <TableRow key={tier.id}>
                    <TableCell>{tier.id}</TableCell>
                    <TableCell>{tier.tier_name}</TableCell>
                    <TableCell>{tier.points_required}</TableCell>
                    <TableCell>{tier.point_multiplier}</TableCell>
                    <TableCell>{tier.benefits}</TableCell>
                    <TableCell>{tier.group_name}</TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
     
 

          <Pagination
            // count={Math.ceil(tiers.length / rowsPerPage)}
            // need to add total number of items in all apis that 
            // return all items like campaigns tiers rewards customers and so on 
            count={100}
            page={page}
            onChange={handleChangePage}
          />
        </MainCard>
      );
    };
    
    export default TiersPage;
    