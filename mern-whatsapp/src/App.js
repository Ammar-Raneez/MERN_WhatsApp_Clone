import React, { useEffect, useState } from 'react';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Login from './Login';
//backend uses pusher, frontend uses pusher-js
import Pusher from 'pusher-js'
import axios from './axios'

function App() {
  const [{ user }] = useStateValue();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('/api/messages/sync')
      .then(response => {
        setMessages(response.data);
      })
  }, [])

  useEffect(() => {
    Pusher.logToConsole = true;

    const pusher = new Pusher('190f9f22f2e3f3646a67', {
      cluster: 'ap2'
    });

    //subscribe to the channel messages (in server.js we named the channel messages)
    //bind on the event of insertion (whenever there's an insertion the data is fetched)
    const channel = pusher.subscribe('messages');
    channel.bind('inserted', newMessage => {
      //whenever a new message is sent, append it onto our exisiting messages
      setMessages([...messages, newMessage]);
    });

    //unsubscribe and unbind all the connections
    //to always keep only one channel open
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages])

  console.log(messages)

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Sidebar />
          <Chat messages={messages} />
        </div>
      )}
    </div>
  );
}

export default App;
