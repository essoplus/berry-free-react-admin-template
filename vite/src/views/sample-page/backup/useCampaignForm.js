import { useState } from 'react';
import { createCampaign } from './campaignApi';

const useCampaignForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(new Array(5).fill(false));
  const [campaignDetails, setCampaignDetails] = useState({
    name: '',
    start_date: new Date().toISOString().slice(0, 10),
    end_date: new Date().toISOString().slice(0, 10),
    description: '',
    events: [],
    conditions: [],
    rewards: [],
    budget: '',
    status: '',
    target_audience: '',
    channel: '',
    campaign_start_time: '',
    campaign_end_time: '',
    start_time: '',
    end_time: '',
    currency_to_point_multiplier: 1,
    aboveAmount: '',
    customerType: [],
    customerEventOptions: [],
    selectedProducts: [],
    selectedDays: [],
    startTime: null,
    endTime: null
  });

  const steps = ['Campaign Basics', 'Events', 'Conditions', 'Effects', 'Review'];

  const handleNext = () => {
    const newActiveStep = Math.min(activeStep + 1, steps.length - 1);
    handleComplete(activeStep);
    setActiveStep(newActiveStep);
  };

  const handleBack = () => setActiveStep((prev) => Math.max(prev - 1, 0));

  const handleStep = (step) => () => setActiveStep(step);

  const handleComplete = (step) => {
    const newCompleted = completed.slice();
    newCompleted[step] = true;
    setCompleted(newCompleted);
  };

  const handleChange = (setter) => (event) => setter(event.target.value);

  const handleCampaignDetailChange = (key) => (value) => {
    setCampaignDetails((prevDetails) => ({
      ...prevDetails,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await createCampaign(campaignDetails);
      alert('Campaign created successfully');
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };

  return {
    activeStep,
    completed,
    steps,
    campaignDetails,
    handleNext,
    handleBack,
    handleStep,
    handleComplete,
    handleChange,
    handleCampaignDetailChange,
    handleSubmit,
  };
};

export default useCampaignForm;
