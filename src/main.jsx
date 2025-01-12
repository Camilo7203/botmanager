import { createRoot } from 'react-dom/client';
//import App from './App';
import MyApp from './pages/index'

import './index.css';

const container = document.querySelector('#app');
const root = createRoot(container);

root.render(<MyApp />);
