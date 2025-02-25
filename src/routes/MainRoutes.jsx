import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import TravellerDetails from 'pages/extra-pages/travellers';
import GuidesTable from 'pages/extra-pages/guide';
import Packages from 'pages/extra-pages/packages';
import PlacesAdmin from 'pages/extra-pages/places';
import ManageGallery from 'pages/extra-pages/gallery';
import BookingPage from 'pages/extra-pages/booking';
import PaymentHistory from 'pages/extra-pages/payment';

const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));
// const travellers = Loadable(lazy(() => import('pages/extra-pages/travellers')));


// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: '/',
      element: <TravellerDetails />
    },
    {
      path: 'color',
      element: <Color />
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
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'travellers',
      element: <TravellerDetails />
    },
    {
      path: 'gallery',
      element: <ManageGallery />
    },
    {
      path: 'booking',
      element: <BookingPage />
    },
    {
      path: 'guide',
      element: <GuidesTable />
    },
    {
      path: 'packages',
      element: <Packages />
    },
    {
      path: 'places',
      element: <PlacesAdmin />
    },
    // {
    //   path: 'payment',
    //   element: <PaymentHistory />
    // },
    
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    }
  ]
};

export default MainRoutes;
