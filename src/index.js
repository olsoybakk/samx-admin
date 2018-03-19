import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import SamxAdministration from './components/SamxAdministration';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<SamxAdministration />, document.getElementById('root'));
registerServiceWorker();
