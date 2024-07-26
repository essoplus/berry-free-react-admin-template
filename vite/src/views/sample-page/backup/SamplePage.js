import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import CampaignCreationForm from './CampaignCreationForm';

const SamplePage = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h4">Create Campaign</Typography>
        <CampaignCreationForm />
      </CardContent>
    </Card>
  );
};

export default SamplePage;
