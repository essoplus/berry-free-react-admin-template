import axios from 'axios';

const createcampaignAPI_URL = 'http://localhost:3010/campaigns';

export const createCampaign = async (campaignData) => {
  try {
    const response = await axios.post(createcampaignAPI_URL, campaignData);
    return response.data;
  } catch (error) {
    console.error('Error creating campaign:', error);
    throw error;
  }
};
