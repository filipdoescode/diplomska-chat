import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { Layout } from '@/src/components/layout';

import App from '@/src/App';

import '@/src/styles/global.css';

ReactDOM.hydrateRoot(
  document.getElementById('app') as HTMLElement,
  <BrowserRouter>
    <Layout>
      <App />
    </Layout>
  </BrowserRouter>
);
