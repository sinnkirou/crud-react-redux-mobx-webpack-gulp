/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-console */
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.client = new WebSocket('ws://localhost:3000/', 'echo-protocol');

    this.client.onerror = () => {
      console.log('Connection Error');
    };

    this.client.onopen = () => {
      console.log('WebSocket this.client Connected');
    };

    this.client.onclose = () => {
      console.log('echo-protocol Client Closed');
    };

    this.client.onmessage = e => {
      if (typeof e.data === 'string') {
        console.log(`this.client Received: '${e.data}'`);
      }
    };
  }

  sendNumber = () => {
    if (this.client.readyState === this.client.OPEN) {
      this.client.send(document.getElementById('inputText').value);
    }
  };

  render() {
    return <div>dasd</div>;
  }
}

export default App;
