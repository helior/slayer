import React from 'react';
import './App.css';
// import * as Utils from '../utils/Utils';

/**
 * App's responsibility are:
 * - render interface to web platform
 * - Controller between State, UI
 * - Manages Initializations of all shared components.
 *
 * ⚙️ Start-up
 * - ✓ check offline/online mode
 * - ✓ collect client environment context
 * - render null state
 * - ✓ connect to ws
 * - getting game state, render the UI
 *
 * TODOS:
 * - clean-up where Websocket responsibilities should really live.
 *
 * @param(props.window) The Web browser's window object.
 */
function App(props) {
  const clientEnv = {
    onLine: props.window && props.window.navigator && props.window.navigator.onLine  ? props.window.navigator.onLine : false,
    userAgent: props.window && props.window.navigator && props.window.navigator.userAgent ? props.window.navigator.userAgent : null
  };

  const offlineUI = (
    <div className="App">
      <div>You have no Internet connection :(</div>
    </div>
  );

  const loadedUI = (
    <div className="App">
      <div className="Game">
        <p>Game goes here.</p>
      </div>
      <div className="Spectators">
        <p>Specators go here.</p>
        <p>{clientEnv.userAgent}</p>
        <button onClick={closeConnection}>Close Connection</button>
      </div>
    </div>
  );

  // WebSocket API: usage
  // @TODO: config for websocket URL
  var socket = new WebSocket("ws://localhost:3000");

  // Create a unique-ish client identifier
  const time = Date.now().toString();
  const timeID = time.substr(time.length - 6); // last 6 digits
  console.log(`Initialize Client(${timeID}).`);

  // On interval, send test data (fixme: should be a "ping")
  const interval = setInterval( () => {
    const msg = {
      data: new Date(),
      clientID: timeID
    };
    console.log(msg.data);
    socket.send(JSON.stringify(msg));
  }, 5 * 1000);

  socket.onopen = function (event) {
    console.log('onopen', event);
    console.log(`socket protocol:`, socket.protocol);
    console.log(`socket readyState:`, socket.readyState);
    console.log(`socket url:`, socket.url);
    console.log(`socket binaryType:`, socket.binaryType);
    console.log(`socket bufferedAmount:`, socket.bufferedAmount);
    console.log(`socket extensions:`, socket.extensions);
    socket.send(JSON.stringify({message: `Client(${timeID}):onopen {event}`}));
  }

  socket.onmessage = function (event) {
    // DON'T SEND BACK TO SERVER, WILL CAUSE LOOP!
    console.log('onmessage', event);
  }

  socket.onerror = function (event) {
    console.log('onerror', event);
  }

  socket.onclose = function (event) {
    console.log('onclose', event);

    // Stop the test data from being sent, connection is gone.
    clearInterval(interval);
    if (!event.wasClean) {
      console.log('Disconnected DIRTY!');
    }
  }

  function closeConnection(event) {
    socket.close();
  }
  // END WebSocket API: usage


  return clientEnv.onLine ? loadedUI : offlineUI;
}

export default App;
