import React, { useEffect } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { updatePointsConfig } from 'utils/dashboardApi'; // Changed from postRatio
import { Box } from '@mui/material';

const TextFieldTest = () => {
  const [ratio, setRatio] = React.useState('');
  const [lastEdited, setLastEdited] = React.useState('');
  const [minPoints, setMinPoints] = React.useState('');
  const [maxPoints, setMaxPoints] = React.useState('');

  useEffect(() => {
    fetch('http://localhost:3010/points-configuration')
      .then(response => response.json())
      .then(data => {
        setRatio(data.ratio); // Changed from data.pointsToCurrencyRatio
        setLastEdited(new Date(data.lastUpdatedTimestamp).toLocaleString());
        setMinPoints(data.minPoints);
        setMaxPoints(data.maxPoints);
      })
      .catch(error => console.error(error));
  }, []);

  const handleRatioChange = (event) => {
    setRatio(event.target.value);
    console.log("Ratio changed: ", event.target.value);
  };

  const handleMinPointsChange = (event) => {
    setMinPoints(event.target.value);
    console.log("Minimum points changed: ", event.target.value);
  };

  const handleMaxPointsChange = (event) => {
    setMaxPoints(event.target.value);
    console.log("Maximum points changed: ", event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await updatePointsConfig({ ratio, minPoints, maxPoints }); // Changed from postRatio
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Box display="flex" flexDirection="column" justifyContent="flex-start">
          <TextField
            variant="outlined"
            value={ratio}
            onChange={handleRatioChange}
            label="Currency to Points Ratio"
            type="number"
            fullWidth
          />
          <TextField
            variant="outlined"
            value={minPoints}
            onChange={handleMinPointsChange}
            label="Minimum Points Spend per Transaction"
            type="number"
            fullWidth
            style={{ marginTop: '10px' }}
          />
          <TextField
            variant="outlined"
            value={maxPoints}
            onChange={handleMaxPointsChange}
            label="Maximum Points Spend per Transaction"
            type="number"
            fullWidth
            style={{ marginTop: '10px' }}
          />
          <p style={{ marginTop: '10px' }}>Last edited: {lastEdited}</p>
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box 
          display="flex" 
          justifyContent="flex-end" 
          alignItems="flex-end" 
          height="100%" 
          style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', height: '50px' }}
        >
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default TextFieldTest;