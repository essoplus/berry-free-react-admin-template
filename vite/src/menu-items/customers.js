import { IconUsers, IconCrown } from '@tabler/icons-react';

const customers = {
  id: 'customers',
  title: 'Customers',
  type: 'group',
  children: [
    {
      id: 'customer-list',
      title: 'Customers',
      type: 'item',
      url: '/customer-list',
      icon: IconUsers,
      breadcrumbs: false
    },
    {
      id: 'transactions',
      title: 'Transactions',
      type: 'item',
      url: '/transactions',
      icon: IconCrown,
      breadcrumbs: false
    },
  ],
};

export default customers;