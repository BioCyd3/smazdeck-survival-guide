import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './styles/main.css';

// Layouts
import RootLayout from './layouts/RootLayout';
import MechanicsLayout from './layouts/MechanicsLayout';

// Pages
import HomePage from './pages/HomePage';
import SmazdexPage from './pages/SmazdexPage';
import SmazProfilePage from './pages/SmazProfilePage';
import TierListPage from './pages/TierListPage';
import BuildsPage from './pages/BuildsPage';
import TeamCompsPage from './pages/TeamCompsPage';
import CampUpgradesPage from './pages/CampUpgradesPage';
import TechTreePage from './pages/TechTreePage';
import TraitsPage from './pages/TraitsPage';
import NotFoundPage from './pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />, // Root layout with Header/Footer wraps all pages
    errorElement: <NotFoundPage />, // Catch-all for routing errors
    children: [
      { index: true, element: <HomePage /> },
      { path: 'smazdex', element: <SmazdexPage /> },
      { path: 'smaz/:id', element: <SmazProfilePage /> },
      { path: 'tier-lists', element: <TierListPage /> },
      { path: 'builds', element: <BuildsPage /> },
      { path: 'team-comps', element: <TeamCompsPage /> },
      {
        // Nested route for all game mechanics pages
        path: 'mechanics',
        element: <MechanicsLayout />,
        children: [
          { path: 'camp-upgrades', element: <CampUpgradesPage /> },
          { path: 'tech-tree', element: <TechTreePage /> },
          { path: 'traits', element: <TraitsPage /> },
        ],
      },
      { path: '*', element: <NotFoundPage /> }, // Handles any other path
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>
);
