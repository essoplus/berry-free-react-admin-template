import dashboard from './dashboard';
// import pages from './pages';
// import utilities from './utilities';
import other from './other';
import settings from './settings';
import customers from './customers';
import campaigns from './campaigns';
// import rewards from './rewards';
// ==============================|| MENU ITEMS ||============================== //
const menuItems = {
  // items: [dashboard, settings]
  // items: [dashboard, settings, pages, utilities, other]
  // items: [dashboard, settings, other]
  // items: [dashboard, customers, campaigns, rewards, settings, other]
  items: [dashboard, customers, campaigns, settings, other]


};
export default menuItems;
