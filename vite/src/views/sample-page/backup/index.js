import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// Ensure lazy loading for SamplePage
const SamplePage = React.lazy(() => import('./SamplePage'));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
        <React.Suspense fallback={<div>Loading...</div>}>
          <SamplePage />
        </React.Suspense>
      </BrowserRouter>
  </React.StrictMode>
);

