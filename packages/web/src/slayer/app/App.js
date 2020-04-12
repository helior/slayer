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
 * - connect to ws
 * - getting game state, render the UI
 *
 * TODOS:
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
      </div>
    </div>
  );

  return clientEnv.onLine ? loadedUI : offlineUI;
}

export default App;
