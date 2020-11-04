import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('search'));

algoliasearchNetlify({
    appId: '4DK77MRTIC',
    apiKey: '5b45a857d06d18ed080ce591d7c89499',
    siteId: '24f76c9d-025f-4764-aed0-ee8531de9936',
    branch: 'staging',
  });