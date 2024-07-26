import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, TextField, FormControl, InputLabel, Select, MenuItem, Grid, Box } from '@mui/material';

function CampaignCreationForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [campaignName, setCampaignName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [campaignType, setCampaignType] = useState('');

  const steps = [
    'Campaign Basics',
    'Campaign Type',
    'Targeting (Optional)',
    'Visuals'
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCampaignNameChange = (event) => {
    setCampaignName(event.target.value);
  };

  // ... Add handlers for startDate, endDate, description, and campaignType

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField label="Campaign Name" variant="outlined" fullWidth value={campaignName} onChange={handleCampaignNameChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Start Date" type="date" variant="outlined" fullWidth value={startDate} onChange={(e) => setStartDate(e.target.value)}  InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={6}>
            <TextField label="End Date" type="date" variant="outlined" fullWidth value={endDate} onChange={(e) => setEndDate(e.target.value)}  InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Description" variant="outlined" fullWidth multiline rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <FormControl fullWidth>
            <InputLabel>Campaign Type</InputLabel>
            <Select label="Campaign Type" value={campaignType} onChange={(e) => setCampaignType(e.target.value)}>
              <MenuItem value="bonus">Bonus Points</MenuItem>
              <MenuItem value="tier">Tier Unlock</MenuItem>
              <MenuItem value="double">Double Points on Category</MenuItem>
            </Select>
            {/* Add conditional form fields based on campaignType */}
          </FormControl>
        );
      // ... Cases for other steps
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box sx={{ width: '80%', margin: 'auto' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ mt: 3 }}>
        {renderStepContent(activeStep)}
        <div> 
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            sx={{ ml: 2 }}
          >
            {activeStep === steps.length - 1 ? 'Create Campaign' : 'Next'}
          </Button>
        </div>
      </Box>
    </Box>
  );
}

export default CampaignCreationForm;
