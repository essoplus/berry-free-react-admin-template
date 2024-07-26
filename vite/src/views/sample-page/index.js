import React, { useState, useEffect } from 'react';
import {ListItemAvatar,CardContent,Card, Avatar,  Stepper, Step, StepButton, Button, TextField, FormControl, InputLabel, Select, MenuItem, Switch, Chip, Stack, Typography, Grid, Box, Accordion, AccordionSummary, AccordionDetails, ListItem, ListItemText,ToggleButton, ToggleButtonGroup } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; 
import CakeIcon from '@mui/icons-material/Cake'; 
import InventoryIcon from '@mui/icons-material/Inventory'; 
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleIcon from '@mui/icons-material/People';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DescriptionIcon from '@mui/icons-material/Description';
import EventIcon from '@mui/icons-material/Event';
import { startOfDay, format  } from 'date-fns';
import { TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from 'axios';

function CampaignCreationForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [campaignName, setCampaignName] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));
  const [description, setDescription] = useState('');
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState({});
  const [minimumSpend, setMinimumSpend] = useState('');
  const [customerType, setCustomerType] = useState([]);
  const [selectedReward, setSelectedReward] = useState('');
  const [aboveAmount, setAboveAmount] = useState('');
  const [customerEventOptions, setCustomerEventOptions] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [selectedDays, setSelectedDays] = useState([]);
  const [campaignStartTime, setCampaignStartTime] = useState(startOfDay(new Date()).setHours(0, 5));
  const [campaignEndTime, setCampaignEndTime] = useState(startOfDay(new Date()).setHours(11, 55));
  const [completed, setCompleted] = useState(new Array(5).fill(false));
  const [timeAndDateConditions, setTimeAndDateConditions] = useState({
    timeOfAction: false,
    linked: false
  });
  const [currencyToPointMultiplier, setCurrencyToPointMultiplier] = useState(1);
  const [conditions, setConditions] = useState({ minimumSpend: false, customerType: false, timeOfAction: false });

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await axios.get('http://localhost:3010/events/event-types');
        const eventTypes = response.data.reduce((acc, event) => {
          acc[event.name] = false;
          return acc;
        }, {});
        setEvents(eventTypes);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    }
    fetchEvents();
  }, []);

  const handleEventChange = (event) => {
    const { name, checked } = event.target;
    setSelectedEvents((prevEvents) => ({
      ...prevEvents,
      [name]: checked
    }));
  };

  const handleChange = setter => event => setter(event.target.value);
  const handleCampaignStartTimeChange = (newTime) => setCampaignStartTime(newTime);
  const handleCampaignEndTimeChange = (newTime) => setCampaignEndTime(newTime);
  const handleDaysChange = (event, newDays) => setSelectedDays(newDays);
  const handleStartTimeChange = (newStartTime) => setStartTime(newStartTime);
  const handleEndTimeChange = (newEndTime) => setEndTime(newEndTime);
  const handleTimeOfActionChange = (event) => {
    setTimeAndDateConditions({
      ...timeAndDateConditions,
      timeOfAction: event.target.checked,
    });
  };
  const handleTimeAndDateLinkChange = (event) => {
    setTimeAndDateConditions({
      ...timeAndDateConditions,
      linked: event.target.checked,
    });
  };
  const handleLinkedChange = (event) => {
    setTimeAndDateConditions({
      ...timeAndDateConditions,
      linked: event.target.checked,
    });
  };
  const handleConditionChange = (event) => setConditions({ ...conditions, [event.target.name]: event.target.checked });

  const handleComplete = (step) => {
    const newCompleted = completed.slice();
    newCompleted[step] = true;
    setCompleted(newCompleted);
  };

  const handleNext = () => {
    const newActiveStep = Math.min(activeStep + 1, steps.length - 1);
    handleComplete(activeStep);
    setActiveStep(newActiveStep);
  };

  const handleBack = () => setActiveStep((prev) => Math.max(prev - 1, 0));
  const handleStep = (step) => () => setActiveStep(step);

  const steps = ['Campaign Basics', 'Events', 'Conditions', 'Effects', 'Review'];

  const renderStepContent = (step) => {
    switch (step) {
      case 0: return (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="Campaign Name" variant="outlined" fullWidth value={campaignName} onChange={handleChange(setCampaignName)} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Start Date" type="date" variant="outlined" fullWidth value={startDate} onChange={handleChange(setStartDate)} InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="End Date" type="date" variant="outlined" fullWidth value={endDate} onChange={handleChange(setEndDate)} InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker label="Campaign Start Time" value={campaignStartTime} onChange={handleCampaignStartTimeChange} renderInput={(params) => <TextField {...params} fullWidth />} />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker label="Campaign End Time" value={campaignEndTime} onChange={handleCampaignEndTimeChange} renderInput={(params) => <TextField {...params} fullWidth />} />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Description" variant="outlined" fullWidth multiline rows={2} value={description} onChange={handleChange(setDescription)} />
          </Grid>
        </Grid>
      );
      case 1: return (
        <FormControl component="fieldset" fullWidth>
          {Object.keys(events).map((event) => (
            <Accordion key={event} expanded={selectedEvents[event]} onChange={handleEventChange} sx={{ marginTop: 2, borderRadius: 4 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${event}-content`} id={`${event}-header`}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <ShoppingCartIcon color={selectedEvents[event] ? 'primary' : 'action'} />
                  <Typography variant="subtitle1">{event}</Typography>
                  <Switch checked={selectedEvents[event]} onChange={handleEventChange} name={event} />
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                {/* Additional fields specific to the event can be added here */}
                {event === 'Purchase' && (
                  <TextField label="Above Amount" type="number" variant="outlined" fullWidth value={aboveAmount} onChange={handleChange(setAboveAmount)} sx={{ minWidth: 400 }} />
                )}
                {event === 'Customer Event' && (
                  <Autocomplete
                    multiple
                    options={['Date of Registration', 'Birthday']}
                    value={customerEventOptions}
                    onChange={(event, newValue) => setCustomerEventOptions(newValue)}
                    renderInput={(params) => <TextField {...params} variant="outlined" label="Options" placeholder="Choose options..." sx={{ minWidth: 400 }} />}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip key={index} variant="outlined" label={option} {...getTagProps({ index })} />
                      ))
                    }
                  />
                )}
                {event === 'Specific Product' && (
                  <Autocomplete
                    multiple
                    options={['Product 1', 'Product 2', 'Product 3']}
                    value={selectedProducts}
                    onChange={(event, newValue) => setSelectedProducts(newValue)}
                    renderInput={(params) => <TextField {...params} variant="outlined" label="Products" placeholder="Choose products..." sx={{ minWidth: 400 }} />}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip key={index} variant="outlined" label={option} {...getTagProps({ index })} />
                      ))
                    }
                  />
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </FormControl>
      );
      case 2: return (
        <FormControl component="fieldset" fullWidth>
          <Accordion expanded={conditions.minimumSpend} onChange={handleConditionChange} sx={{ marginTop: 2, borderRadius: 4 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="minimumSpend-content" id="minimumSpend-header">
              <Stack direction="row" alignItems="center" spacing={1}>
                <AttachMoneyIcon color={conditions.minimumSpend ? 'primary' : 'action'} />
                <Typography variant="subtitle1">Minimum Spend</Typography>
                <Switch checked={conditions.minimumSpend} onChange={handleConditionChange} name="minimumSpend" />
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <TextField label="Minimum Spend" type="number" variant="outlined" fullWidth value={minimumSpend} onChange={handleChange(setMinimumSpend)} sx={{ minWidth: 400 }} />
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={conditions.customerType} onChange={handleConditionChange} sx={{ marginTop: 2, borderRadius: 4 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="customerType-content" id="customerType-header">
              <Stack direction="row" alignItems="center" spacing={1}>
                <PeopleIcon color={conditions.customerType ? 'primary' : 'action'} />
                <Typography variant="subtitle1">Customer Type</Typography>
                <Switch checked={conditions.customerType} onChange={handleConditionChange} name="customerType" />
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <Autocomplete
                multiple
                options={['Guest', 'Registered Customer', 'Repeated Customer']}
                value={customerType}
                onChange={(event, newValue) => setCustomerType(newValue)}
                renderInput={(params) => <TextField {...params} variant="outlined" label="Customer Type" placeholder="Choose types..." sx={{ minWidth: 400 }} />}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip key={index} variant="outlined" label={option} {...getTagProps({ index })} />
                  ))
                }
              />
            </AccordionDetails>
          </Accordion>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Accordion expanded={timeAndDateConditions.timeOfAction} onChange={handleTimeAndDateLinkChange} sx={{ marginTop: 2, borderRadius: 4 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="timeOfAction-content" id="timeOfAction-header">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <AccessTimeIcon color={timeAndDateConditions.timeOfAction ? 'primary' : 'action'} />
                  <Typography variant="subtitle1">Time of Action</Typography>
                  <Switch checked={timeAndDateConditions.timeOfAction} onChange={handleTimeOfActionChange} name="timeOfAction" />
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={2} direction="column">
                  <FormControlLabel
                    control={<Switch checked={timeAndDateConditions.linked} onChange={handleLinkedChange} name="linked" />}
                    label="Link days and hours"
                  />
                  <ToggleButtonGroup color="primary" value={selectedDays} onChange={handleDaysChange} aria-label="select weekdays" fullWidth>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                      <ToggleButton key={day} value={day} aria-label={day.toLowerCase()}>
                        {day}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                  <Stack direction="row" spacing={2}>
                    <TimePicker label="Start Time" value={startTime} onChange={handleStartTimeChange} renderInput={(params) => <TextField {...params} fullWidth />} />
                    <TimePicker label="End Time" value={endTime} onChange={handleEndTimeChange} renderInput={(params) => <TextField {...params} fullWidth />} />
                  </Stack>
                </Stack>
              </AccordionDetails>
            </Accordion>
          </LocalizationProvider>
        </FormControl>
      );
      case 3: return (
        <FormControl fullWidth>
          <Grid item xs={12}>
            <TextField
              label="Currency to Point Multiplier"
              variant="outlined"
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 1 } }}
              value={currencyToPointMultiplier}
              onChange={handleChange(setCurrencyToPointMultiplier)}
              sx={{ marginBottom: 2 }}
            />
          </Grid>
          <FormControl>
            <InputLabel>Reward</InputLabel>
            <Select value={selectedReward} label="Reward" onChange={handleChange(setSelectedReward)}>
              <MenuItem value="reward1">Reward 1</MenuItem>
              <MenuItem value="reward2">Reward 2</MenuItem>
            </Select>
          </FormControl>
        </FormControl>
      );
      case 4: return (
        <FormControl fullWidth>
          <Box sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>Review Campaign Details</Typography>
            <Grid container spacing={2}>
              {[
                { icon: <DescriptionIcon />, label: "Campaign Name", value: campaignName },
                { icon: <DescriptionIcon />, label: "Description", value: description },
                { icon: <EventIcon />, label: "Start Date", value: startDate },
                { icon: <EventIcon />, label: "End Date", value: endDate },
                { icon: <AccessTimeIcon />, label: "Campaign Start Time", value: campaignStartTime ? format(campaignStartTime, 'hh:mm a') : 'Not Set' },
                { icon: <AccessTimeIcon />, label: "Campaign End Time", value: campaignEndTime ? format(campaignEndTime, 'hh:mm a') : 'Not Set' },
                { icon: <ShoppingCartIcon />, label: "Events Activated", value: Object.keys(selectedEvents).filter(key => selectedEvents[key]).join(', ') },
                { icon: <AttachMoneyIcon />, label: "Above Amount", value: aboveAmount },
                { icon: <PeopleIcon />, label: "Customer Type", value: customerType.join(', ') },
                { icon: <AccessTimeIcon />, label: "Selected Days", value: selectedDays.join(', ') },
                { icon: <AccessTimeIcon />, label: "Start Time", value: startTime ? startTime.toLocaleTimeString() : 'Not Set' },
                { icon: <AccessTimeIcon />, label: "End Time", value: endTime ? endTime.toLocaleTimeString() : 'Not Set' },
                { icon: <PeopleIcon />, label: "Selected Reward", value: selectedReward },
                { icon: <AttachMoneyIcon />, label: "Currency to Point Multiplier", value: currencyToPointMultiplier },
                { icon: <InventoryIcon />, label: "Selected Products", value: selectedProducts.join(', ') },
                { icon: <CakeIcon />, label: "Customer Event Options", value: customerEventOptions.join(', ') },
              ].map((item, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card variant="outlined">
                    <CardContent>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: "primary.main" }}>
                            {item.icon}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={item.label} secondary={item.value} />
                      </ListItem>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </FormControl>
      );
      default: return 'Unknown step';
    }
  };

  return (
    <Box sx={{ width: '80%', margin: 'auto' }}>
      <Stepper nonLinear activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton onClick={handleStep(index)} completed={completed[index]} StepIconProps={{ color: activeStep === index ? 'primary' : 'inherit' }}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ mt: 3 }}>
        {renderStepContent(activeStep)}
        <div>
          <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mt: 2 }}>Back</Button>
          <Button variant="contained" onClick={handleNext} sx={{ ml: 2, mt: 2 }}>
            {activeStep === steps.length - 1 ? 'Create Campaign' : 'Next'}
          </Button>
        </div>
      </Box>
    </Box>
  );
}

export default CampaignCreationForm;
