import React, { useState } from 'react';
import { Stepper, Step, StepButton, Button, Box } from '@mui/material';
import CampaignCreationStepContent from './CampaignCreationStepContent';
import useCampaignCreationState from './CampaignCreationState';

const CampaignCreationForm = () => {
  // Define additional state for time and date conditions
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [selectedDays, setSelectedDays] = useState([]);
  const [timeAndDateConditions, setTimeAndDateConditions] = useState({
    timeOfAction: false,
    linked: false,
  });

  // Destructure values from the custom hook
  const {
    campaignName, setCampaignName,
    startDate, setStartDate,
    endDate, setEndDate,
    description, setDescription,
    events, setEvents,
    minimumSpend, setMinimumSpend,
    customerType, setCustomerType,
    selectedReward, setSelectedReward,
    aboveAmount, setAboveAmount,
    customerEventOptions, setCustomerEventOptions,
    selectedProducts, setSelectedProducts,
    campaignStartTime, setCampaignStartTime,
    campaignEndTime, setCampaignEndTime,
    completed, setCompleted,
    activeStep, setActiveStep,
    currencyToPointMultiplier, setCurrencyToPointMultiplier,
    conditions, setConditions,
  } = useCampaignCreationState();

  // Steps for the Stepper component
  const steps = ['Campaign Basics', 'Events', 'Conditions', 'Effects', 'Review'];

  // Handle advancing to the next step
  const handleNext = () => {
    const newActiveStep = Math.min(activeStep + 1, steps.length - 1);
    setCompleted({ ...completed, [activeStep]: true });
    setActiveStep(newActiveStep);
  };

  // Handle going back to the previous step
  const handleBack = () => {
    const newActiveStep = Math.max(activeStep - 1, 0);
    setActiveStep(newActiveStep);
  };

  // Handle clicking on a specific step
  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ width: '80%', margin: 'auto' }}>
      <Stepper nonLinear activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton onClick={handleStep(index)} completed={!!completed[index]} StepIconProps={{ color: activeStep === index ? 'primary' : 'inherit' }}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ mt: 3 }}>
        <CampaignCreationStepContent
          activeStep={activeStep}
          handleEventChange={(e) => setEvents({ ...events, [e.target.name]: e.target.checked })}
          events={events}
          handleConditionChange={(e) => setConditions({ ...conditions, [e.target.name]: e.target.checked })}
          conditions={conditions}
          handleChange={(name) => (value) => {
            const setterMap = {
              campaignName: setCampaignName,
              startDate: setStartDate,
              endDate: setEndDate,
              description: setDescription,
              aboveAmount: setAboveAmount,
              customerEventOptions: setCustomerEventOptions,
              selectedProducts: setSelectedProducts,
              campaignStartTime: setCampaignStartTime,
              campaignEndTime: setCampaignEndTime,
              minimumSpend: setMinimumSpend,
              customerType: setCustomerType,
              selectedReward: setSelectedReward,
              currencyToPointMultiplier: setCurrencyToPointMultiplier,
            };
            setterMap[name](value);
          }}
          formData={{
            campaignName, startDate, endDate, description, minimumSpend, customerType, selectedReward, currencyToPointMultiplier
          }}
          aboveAmount={aboveAmount}
          customerEventOptions={customerEventOptions}
          selectedProducts={selectedProducts}
          startTime={startTime}
          endTime={endTime}
          selectedDays={selectedDays}
          campaignStartTime={campaignStartTime}
          campaignEndTime={campaignEndTime}
          timeAndDateConditions={timeAndDateConditions}
          handleTimeOfActionChange={(e) => setTimeAndDateConditions({ ...timeAndDateConditions, timeOfAction: e.target.checked })}
          handleTimeAndDateLinkChange={(e) => setTimeAndDateConditions({ ...timeAndDateConditions, linked: e.target.checked })}
          handleLinkedChange={(e) => setTimeAndDateConditions({ ...timeAndDateConditions, linked: e.target.checked })}
          handleDaysChange={(e, newDays) => setSelectedDays(newDays)}
          handleStartTimeChange={(newStartTime) => setStartTime(newStartTime)}
          handleEndTimeChange={(newEndTime) => setEndTime(newEndTime)}
        />
        <div>
          <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mt: 2 }}>Back</Button>
          <Button variant="contained" onClick={handleNext} sx={{ ml: 2, mt: 2 }}>
            {activeStep === steps.length - 1 ? 'Create Campaign' : 'Next'}
          </Button>
        </div>
      </Box>
    </Box>
  );
};

export default CampaignCreationForm;
