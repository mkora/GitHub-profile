import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Statistics from 'Statistics';
import registerServiceWorker from './utils/registerServiceWorker';

ReactDOM.render(<Statistics />, document.getElementById('root'));
registerServiceWorker();
