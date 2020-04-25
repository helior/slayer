const express = require('express');
const http = require('http');
const WebSocket = require('ws');

console.log('Running...');

const app = express();
const port = process.env.PORT || 8080;
const name = process.env.name || 'Wizards';

app.get('/health-check', (req, res) => res.send(`Hello ${name}!`));
// app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server started on port ${server.address().port} :)`);
});

/**
 * WebSocket service.
 *
 * Links to look at for improvements:
 * - https://github.com/websockets/ws#how-to-detect-and-close-broken-connections
 * - https://github.com/websockets/ws/wiki/client-auto-reconnect-with-ping-listener---exponential-back-off-timeout
 */
const wss = new WebSocket.Server({ server: server });
let connectedUsers = 0;
let users = [];

wss.on('connection', function connection(ws, request) {
  connectedUsers++;
  // Start here.
  console.log('—————————————————————');
  console.log('connection', `{ws} {request}`);
  console.log(`Connected users: ${connectedUsers}`);
  ws.send(`Server: Connection.`);

  ws.on('close', function close(code, reason) {
    connectedUsers--;
    console.log('close', code, reason);
    console.log(`Connected users: ${connectedUsers}`);
    ws.send(`Server: Close. code: {code} {reason}`);
  });

  ws.on('error', function error(error) {
    console.log('error', error);
    ws.send(`Server: Error {error}`);
  });

  ws.on('message', function message(data) {
    // DON'T SEND BACK TO CLIENT, WILL CAUSE LOOP!
    try {
      console.log(JSON.parse(data));
    }
    catch (e) {
      console.error("Catch:",e);
    }
  });

  ws.on('open', function open() {
    console.log('open');
    ws.send(`Server:open`);
  });

  ws.on('ping', function ping(data) {
    console.log('ping', data);
    ws.send(`Server:ping {data}`);
  });

  ws.on('pong', function pong(data) {
    console.log('pong', data);
    ws.send(`Server:pong {data}`);
  });

  ws.on('unexpected-response', function unexpectedResponse(request, response) {
    console.log('unexpected', request, response);
    ws.send(`Server:unexpected {request} {response}`);
  });

  ws.on('upgrade', function upgrade(response) {
    console.log('upgrade', response);
    ws.send(`Server:upgrade {response}`);
  });
});
