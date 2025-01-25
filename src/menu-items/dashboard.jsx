// assets
import { 
  DashboardOutlined, 
  UserOutlined, 
  IdcardOutlined, 
  AppstoreAddOutlined, 
  EnvironmentOutlined, 
  PictureOutlined, 
  FileSearchOutlined, 
  PayCircleOutlined 
} from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  UserOutlined,  // For Travellers
  IdcardOutlined, // For Guides
  AppstoreAddOutlined, // For Packages
  EnvironmentOutlined, // For Places
  PictureOutlined, // For Gallery
  FileSearchOutlined, // For Booking
  PayCircleOutlined // For Payment
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'Travellers',
      title: 'Travellers',
      type: 'item',
      url: '/travellers',
      icon: icons.UserOutlined, // Changed to UserOutlined
      target: true
    },
    {
      id: 'Guides',
      title: 'Guides',
      type: 'item',
      url: '/guide',
      icon: icons.IdcardOutlined, // Changed to IdcardOutlined
      target: true
    },
    {
      id: 'Packages',
      title: 'Packages',
      type: 'item',
      url: '/Packages',
      icon: icons.AppstoreAddOutlined, // Changed to AppstoreAddOutlined
      target: true
    },
    {
      id: 'Places',
      title: 'Places',
      type: 'item',
      url: '/places',
      icon: icons.EnvironmentOutlined, // Changed to EnvironmentOutlined
      target: true
    },
    {
      id: 'Gallery',
      title: 'Gallery',
      type: 'item',
      url: '/gallery',
      icon: icons.PictureOutlined, // Changed to PictureOutlined
      target: true
    },
    {
      id: 'Booking',
      title: 'Booking',
      type: 'item',
      url: '/booking',
      icon: icons.FileSearchOutlined, // Changed to FileSearchOutlined
      target: true
    },
    {
      id: 'payment',
      title: 'Payment',
      type: 'item',
      url: '/payment',
      icon: icons.PayCircleOutlined, // Changed to PayCircleOutlined
      target: true
    }
  ]
};

export default dashboard;
