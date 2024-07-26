import {IconStairs, IconGift,IconChartAreaLine , IconTagStarred } from '@tabler/icons-react';

const campaigns = {
  id: 'campaigns',
  title: 'Campaigns',
  type: 'group',
  children: [
    {
      id: 'campaigns-page',
      title: 'Campaigns',
      type: 'item',
      url: '/campaigns',
      icon: IconTagStarred,
      breadcrumbs: false
    },


    {
      id: 'rewards-list',
      title: 'Rewards',
      type: 'item',
      url: '/rewards-list',
      icon: IconGift,
      breadcrumbs: false
    },
  
    {
      id: 'tiers',
      title: 'Tiers',
      type: 'item',
      url: '/tiers',
      icon: IconStairs,
      breadcrumbs: false
    },


    {
      id: 'usage',
      title: 'Usage',
      type: 'item',
      url: '/usage',
      icon: IconChartAreaLine,
      breadcrumbs: false
    },



  ],
};

export default campaigns;