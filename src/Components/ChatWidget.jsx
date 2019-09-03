/* eslint-disable no-console */
import React from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';

class ChatWidget extends React.Component {
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
        addResponseMessage(e.data);
      }
    };
  }

  componentDidMount() {
    addResponseMessage('Welcome to this awesome chat!');
  }

  handleNewUserMessage = newMessage => {
    console.log(`New message incomig! ${newMessage}`);
    // Now send the message throught the backend API
    if (this.client.readyState === this.client.OPEN) {
      this.client.send(newMessage);
    }
  };

  render() {
    return (
      <div>
        <Widget
          handleNewUserMessage={this.handleNewUserMessage}
          title="My new awesome title"
          subtitle="And my cool subtitle"
        />
      </div>
    );
  }
}

export default ChatWidget;
