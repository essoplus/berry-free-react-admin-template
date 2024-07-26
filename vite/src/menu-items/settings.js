// imports
import { IconSettings, IconTrendingUp } from '@tabler/icons-react';

// constant
const icons = { IconSettings, IconTrendingUp };

// ==============================|| SETTINGS MENU ITEMS ||============================== //

const settings = {
  id: 'settings',
  title: 'Settings',
  type: 'group',
  children: [
    // {
    // //   id: 'default',
    //   title: 'Settings',
    //   type: 'item',
    //   url: '/settings',
    //   icon: icons.IconSettings,
    //   breadcrumbs: false
    // },
    {
      id: 'points',
      title: 'Points',
      type: 'item',
      url: '/points',
    //   icon: icons.IconTrendingUp,
      icon: icons.IconSettings,
      breadcrumbs: false
    }
  ]
};

export default settings;