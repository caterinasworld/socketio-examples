const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const assert = require('assert');
const port = 5000;

app.use(express.static(__dirname + '/client/'));

io.on('connection', (socket) => {
  console.log(`client with socket id ${socket.id} connected`);

  socket.on('drag', (data) => {
    // console.log(data);

    assert(data.left !== undefined);
    assert(data.top !== undefined);

    io.emit('update', data);
  });

  socket.on('disconnect', () => {
    console.log(`client with socket id ${socket.id} disconnected`);
  });
});

server.listen(port, () => {
  console.log(`Application running at "http://localhost:${port}/"`);
});
