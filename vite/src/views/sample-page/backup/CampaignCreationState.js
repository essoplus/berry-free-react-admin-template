import { useState } from 'react';

const useCampaignCreationState = () => {
  const [campaignName, setCampaignName] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));
  const [description, setDescription] = useState('');
  const [events, setEvents] = useState({ purchase: false, customerEvent: false, specificProduct: false });
  const [minimumSpend, setMinimumSpend] = useState('');
  const [customerType, setCustomerType] = useState([]);
  const [selectedReward, setSelectedReward] = useState('');
  const [aboveAmount, setAboveAmount] = useState('');
  const [customerEventOptions, setCustomerEventOptions] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [selectedDays, setSelectedDays] = useState([]);
  const [campaignStartTime, setCampaignStartTime] = useState(
    new Date().setHours(0, 5)
  );
  const [campaignEndTime, setCampaignEndTime] = useState(
    new Date().setHours(11, 55)
  );
  const [completed, setCompleted] = useState(new Array(5).fill(false));
  const [activeStep, setActiveStep] = useState(0);
  const [currencyToPointMultiplier, setCurrencyToPointMultiplier] = useState(1);
  const [conditions, setConditions] = useState({ minimumSpend: false, customerType: false, timeOfAction: false });
  const [timeAndDateConditions, setTimeAndDateConditions] = useState({
    timeOfAction: false,
    linked: false,
  });

  return {
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
    startTime, setStartTime,
    endTime, setEndTime,
    selectedDays, setSelectedDays,
    campaignStartTime, setCampaignStartTime,
    campaignEndTime, setCampaignEndTime,
    completed, setCompleted,
    activeStep, setActiveStep,
    currencyToPointMultiplier, setCurrencyToPointMultiplier,
    conditions, setConditions,
    timeAndDateConditions, setTimeAndDateConditions,
  };
};

export default useCampaignCreationState;
