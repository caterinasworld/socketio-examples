const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 5001;

app.use(express.static(__dirname + '/client/'));

io.on('connection', (socket) => {
  console.log(`client with socket id ${socket.id} connected`);

  socket.emit('welcome', {
    welcome: 'Welcome to the chat',
    socket: socket.id,
  });

  socket.on('message', (data) => {
    console.log(data);

    io.emit('message', {
      socket: socket.id.substr(0, 4),
      message: data,
    });
  });

  socket.on('disconnect', () => {
    console.log(`client with socket id ${socket.id} disconnected`);
  });
});

server.listen(port, () => {
  console.log(`Application running at "http://localhost:${port}/"`);
});
