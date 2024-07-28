import { createRoot } from 'react-dom/client';
import { App } from './src/App';
import { FiltersProvider } from './src/context/filters';

const root = createRoot(document.getElementById('root'));

root.render(
  <FiltersProvider>
    <App />
  </FiltersProvider>
)