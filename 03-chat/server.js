const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 5000;

app.use(express.static(__dirname + '/public/'));

io.on('connection', (socket) => {
  console.log('client connected');

  socket.emit('welcome', {
    welcome: 'Welcome to the chat',
    socketId: socket.id,
  });

  socket.on('message', (data) => {
    console.log(data);

    io.emit('message', {
      socketId: socket.id.substr(0, 4),
      message: data,
    });
  });

  socket.on('disconnect', () => {
    console.log('client disconnected');
  });
});

server.listen(port, () => {
  console.log(`Application running at "http://localhost:${port}/"`);
});
