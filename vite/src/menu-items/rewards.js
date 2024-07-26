import { IconStairs, IconGift,IconChartAreaLine } from '@tabler/icons-react';

const rewards = {
  id: 'rewards',
  title: 'Rewards',
  type: 'group',
  children: [
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

export default rewards;