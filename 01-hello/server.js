const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 5000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// open the socket
io.on('connection', (socket) => {
  // emit the 'hello' event to the client
  socket.emit('hello', {
    hello: 'world',
  });

  // handle the 'goodbye' event emitted by the client
  socket.on('goodbye', (data) => {
    console.log(data);
  });
});

server.listen(port, () => {
  console.log(`Application running at "http://localhost:${port}/"`);
});
