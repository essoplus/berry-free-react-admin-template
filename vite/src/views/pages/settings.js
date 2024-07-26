import React from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { updatePointsConfig } from 'utils/dashboardApi'; // Changed from postRatio

const TextFieldTest = () => {
  const [ratio, setRatio] = React.useState(''); // Changed from updatePointsConfig

  const handleRatioChange = (event) => {
    setRatio(event.target.value); // Changed from updatePointsConfig
    console.log("Ratio changed: ", event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await updatePointsConfig(ratio);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <TextField
          variant="outlined"
          value={ratio}
          onChange={handleRatioChange}
          label="Ratio"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default TextFieldTest;