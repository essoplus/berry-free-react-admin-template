import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// settings routing
const Settings = Loadable(lazy(() => import('views/pages/settings')));

// points routing
const Points = Loadable(lazy(() => import('views/pages/points')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

//  sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
// zVendo pages routing
const CustomerListPage = Loadable(lazy(() => import('views/pages/CustomerListPage')));
const TransactionsPage = Loadable(lazy(() => import('views/pages/TransactionsPage')));
const CampaignsPage = Loadable(lazy(() => import('views/pages/CampaignsPage')));
const RewardsListPage = Loadable(lazy(() => import('views/pages/RewardsListPage')));
const UsagePage = Loadable(lazy(() => import('views/pages/UsagePage')));
const TiersPage = Loadable(lazy(() => import('views/pages/TiersPage')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'customer-list',
      element: <CustomerListPage />
    },
    {
      path: 'transactions',
      element: <TransactionsPage />
    },
    {
      path: 'campaigns',
      element: <CampaignsPage />
    },
    {
      path: 'rewards-list',
      element: <RewardsListPage />
    },
    {
      path: 'usage',
      element: <UsagePage />
    }, {
      path: 'tiers',
      element: <TiersPage />
    },
    {
      path: 'settings',
      element: <Settings />
    },
    {
      path: 'points',
      element: <Points />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-typography',
          element: <UtilsTypography />
        },
        {
          path: 'util-color',
          element: <UtilsColor />
        },
        {
          path: 'util-shadow',
          element: <UtilsShadow />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'tabler-icons',
          element: <UtilsTablerIcons />
        },
        {
          path: 'material-icons',
          element: <UtilsMaterialIcons />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    }
  ]
};

export default MainRoutes;