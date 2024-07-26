// Import necessary libraries and components
import React, { useEffect, useState, useCallback } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem, Snackbar, FormHelperText } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
// import ZvendoLoyaltyDataGrid from 'ui-component/zvendocomponents/ZvendoLoyaltyDataGrid';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';



import Draggable from 'react-draggable';
import Paper from '@mui/material/Paper';


// ...










// Define the RewardsPage component
const RewardsPage = () => {
  // Define state variables
  const [rewards, setRewards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  });
 // Define the ZvendoLoyaltyDataGrid component
 const ZvendoLoyaltyDataGrid = ({
  rows,
  columns,
  pageSize,
  // getRowId,
  rowCount,
  pagination,
  onPageChange,
  onPageSizeChange,
  loading,
  onCellEditCommit,

}) => {
  // const handleSelectionChange = (selectionModel) => {
  //   console.log('Selection model:', selectionModel);
  //   if (onSelectionModelChange) {
  //     onSelectionModelChange(selectionModel);
  //   }
  // };











  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        pageSizeOptions={[5, 24, 40, 100]}
        getRowId={(row) => row.reward_id}
        rowCount={rowCount}
        pagination={pagination}
        // paginationMode="server"
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        loading={loading}
        onCellEditCommit={onCellEditCommit}
        checkboxSelection
        disableSelectionOnClick
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setRowSelectionModel(newRowSelectionModel);
        }}
        rowSelectionModel={rowSelectionModel}
         slots={{
          toolbar: GridToolbar,
          LoadingOverlay: LinearProgress
        }}
      />
    </div>
  );
};






  const [newReward, setNewReward] = useState({
    reward_type_id: '',
    reward_name: '',
    reward_description: '',
    required_points: '',
    discount_amount: '',
    discount_type: '',
    start_date: '',
    end_date: '',
    active: false
  });


  // Validates new reward data before submission
const validateReward = (reward) => {
  const requiredFields = ['reward_type_id', 'reward_name', 'reward_description', 'required_points', 'discount_amount', 'discount_type', 'start_date', 'end_date'];
  const missingFields = requiredFields.filter(field => !reward[field]); // Check for empty fields
  return {
    isValid: missingFields.length === 0,
    missingFields,
  };
};









  // Define handler functions
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setNewReward({
      ...newReward,
      [event.target.name]: event.target.value
    });
  };

// Handles the submission of the form data
const handleFormSubmit = () => {
  const { isValid, missingFields } = validateReward(newReward);

  if (!isValid) {
    // Update snackbar for showing the error message
    setSnackbar({
      open: true,
      message: `Missing required fields: ${missingFields.join(', ')}`,
      severity: 'error'
    });
    return;
  }

  // Proceed with the API request if validation is successful
  fetch('http://localhost:3010/rewards/rewards', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newReward)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    setRewards([...rewards, data]);
    setSnackbar({
      open: true,
      message: 'Reward added successfully.',
      severity: 'success'
    });
    handleClose(); // Close the dialog after successful addition
  })
  .catch(error => {
    console.error(error);
    setSnackbar({
      open: true,
      message: 'Failed to add reward. ' + error.message,
      severity: 'error'
    });
  });
};





  function DeleteDialogPaperComponent(props) {
    return (
      <Draggable handle="#draggable-delete-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper {...props} />
      </Draggable>
    );
  }
  

  const handleOpenDeleteDialog = () => {
    if (rowSelectionModel.length === 0) {
      setSnackbar({ open: true, message: "No rows selected for deletion.", severity: "warning" });
      return;
    }
    setOpenDeleteDialog(true);
  };
  
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  
  const handleConfirmDelete = () => {
   
    handleDelete();
    handleCloseDeleteDialog();
  };



  const handleDelete = () => {
  
  
    fetch(`http://localhost:3010/rewards/rewards`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ids: rowSelectionModel }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(() => {
      setRewards(prevRewards => prevRewards.filter(reward => !rowSelectionModel.includes(reward.reward_id)));
      setSnackbar({ open: true, message: "Selected rewards deleted successfully.", severity: "success" });
    })
    .catch(error => {
      console.error(error);
      setSnackbar({ open: true, message: "Failed to delete rewards. " + error.message, severity: "error" });
    });
  };
  
  // const handleRowSelection = (selectionModel) => {
  //   setSelectedRows(selectionModel);
  //   const selectedRowData = rewards.filter(reward => selectionModel.includes(reward.reward_id));
  //   console.log("Selected rows: ", selectedRowData);
  // };

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:3010/rewards/allrewards?page=${page}&limit=${limit}`)
      .then(response => response.json())
      .then(data => {
        setRewards(data.data);
        setTotalRecords(data.totalRecords);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  }, [page, limit]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0) {
      setPage(newPage);
    }
  };

  const handlePageSizeChange = (newPageSize) => {
    if (newPageSize > 0) {
      setLimit(newPageSize);
      setPage(1);
    }
  };

 
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };


  const handleEditCellChangeCommitted = useCallback(
    ({ id, field, value }) => {  // Corrected parameter access
      console.log("Editing:", { id, field, value });  // Debug log
      const updatedRow = {
        ...rewards.find(reward => reward.reward_id === id),
        [field]: value,
      };

      fetch(`http://localhost:3010/rewards/rewards/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedRow)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        setRewards(prevRewards => prevRewards.map(reward => reward.reward_id === id ? updatedRow : reward));
      })
      .catch(error => {
        console.error(error);
      });
    },
    [rewards]
);

  
  
  

  // Define the columns for the data grid
  const columns = [
    { field: 'reward_id', headerName: 'ID', sortable: true },
    { field: 'reward_type_id', headerName: 'Type ID', sortable: true, editable: true },
    { field: 'reward_name', headerName: 'Name', sortable: true, editable: true },
    { field: 'reward_description', headerName: 'Description', sortable: true, editable: true },
    { field: 'required_points', headerName: 'Required Points', sortable: true, editable: true },
    { field: 'discount_amount', headerName: 'Discount Amount', sortable: true, editable: true },
    { field: 'discount_type', headerName: 'Discount Type', sortable: true, editable: true },
    { field: 'start_date', headerName: 'Start Date', sortable: true, editable: true },
    { field: 'end_date', headerName: 'End Date', sortable: true, editable: true },
    { field: 'active', headerName: 'Active', sortable: true, editable: true },
  ];

  // Render the component
  return (
    <MainCard title="Rewards">

<Dialog
  open={openDeleteDialog}
  onClose={handleCloseDeleteDialog}
  PaperComponent={DeleteDialogPaperComponent}
>
  <DialogTitle style={{ cursor: 'move' }} id="draggable-delete-dialog-title">
    Confirm Deletion
  </DialogTitle>
  <DialogContent>
    {`Are you sure you want to delete ${rowSelectionModel.length} selected reward${rowSelectionModel.length !== 1 ? 's' : ''}?`}
  </DialogContent>
  <DialogActions>
    <Button autoFocus onClick={handleCloseDeleteDialog} color="primary">
      Cancel
    </Button>
    <Button onClick={handleConfirmDelete} color="primary">
      Delete
    </Button>
  </DialogActions>
</Dialog>







      <TextField sx={{ m: 1 }} label="Search" variant="outlined" value={searchTerm} onChange={handleSearchChange} />
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Reward
      </Button>
      <Button variant="contained" color="secondary" onClick={handleOpenDeleteDialog }   disabled={rowSelectionModel.length === 0} >
  Delete Selected
</Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Reward</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel id="reward-type-id-label">Type ID</InputLabel>
            <Select
              labelId="reward-type-id-label"
              id="reward-type-id"
              name="reward_type_id"
              value={newReward.reward_type_id}
              onChange={handleInputChange}
            >
              {[...Array(10)].map((_, i) => (
                <MenuItem key={i + 1} value={i + 1}>
                  {i + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
  margin="dense"
  name="reward_name"
  label="Name"
  type="text"
  fullWidth
  value={newReward.reward_name}
  onChange={handleInputChange}
  error={!newReward.reward_name}
  helperText={!newReward.reward_name && 'Name is required'} 
/>

<TextField
  margin="dense"
  name="reward_description"
  label="Description"
  type="text"
  fullWidth
  value={newReward.reward_description}
  onChange={handleInputChange}
  error={!newReward.reward_description}
  helperText={!newReward.reward_description && 'Description is required'} 
/>

<TextField
  margin="dense"
  name="required_points"
  label="Required Points"
  type="number"
  fullWidth
  value={newReward.required_points}
  onChange={handleInputChange}
  error={!newReward.required_points}
  helperText={!newReward.required_points && 'Required points are necessary'} 
/>

<TextField
  margin="dense"
  name="discount_amount"
  label="Discount Amount"
  type="number"
  fullWidth
  value={newReward.discount_amount}
  onChange={handleInputChange}
  error={!newReward.discount_amount}
  helperText={!newReward.discount_amount && 'Discount amount is required'} 
/>

<FormControl fullWidth margin="dense" error={!newReward.discount_type}>
  <InputLabel id="discount-type-label">Discount Type</InputLabel>
  <Select
    labelId="discount-type-label"
    id="discount-type"
    name="discount_type"
    value={newReward.discount_type}
    onChange={handleInputChange}
  >
    <MenuItem value={'percentage'}>Percentage</MenuItem>
    <MenuItem value={'fixed'}>Fixed</MenuItem>
  </Select>
  {!newReward.discount_type && <FormHelperText>Discount type is required</FormHelperText>} 
</FormControl>

<TextField
  margin="dense"
  name="start_date"
  label="Start Date"
  type="date"
  fullWidth
  InputLabelProps={{ shrink: true }}
  value={newReward.start_date}
  onChange={handleInputChange}
  error={!newReward.start_date}
  helperText={!newReward.start_date && 'Start date is required'} 
/>

<TextField
  margin="dense"
  name="end_date"
  label="End Date"
  type="date"
  fullWidth
  InputLabelProps={{ shrink: true }}
  value={newReward.end_date}
  onChange={handleInputChange}
  error={!newReward.end_date}
  helperText={!newReward.end_date && 'End date is required'} 
/>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleFormSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbar.message}
        severity={snackbar.severity}
      />





      <ZvendoLoyaltyDataGrid 
        
        rows={rewards}
        columns={columns}
        pageSize={limit}
        pageSizeOptions={[11, 22, 55, 100]}
        pagination
        rowCount={totalRecords}
        getRowId={(row) => row.reward_id}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        onCellEditCommit={handleEditCellChangeCommitted}
        
        loading={isLoading}
        disableSelectionOnClick
        slots={{
          toolbar: GridToolbar,
          LoadingOverlay: LinearProgress
        }}


      />
    </MainCard>
  );
};

// Export the component
export default RewardsPage;