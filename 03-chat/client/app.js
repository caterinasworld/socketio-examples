const socket = io('http://localhost:5000');

const chat = document.querySelector('.chat');

socket.on('message', (data) => {
  let username = document.createElement('span');
  username.classList.add('username');
  username.textContent = `${data.socket.toUpperCase()}: `;

  let message = document.createElement('span');
  message.textContent = data.message;

  let element = document.createElement('div');
  element.append(username);
  element.append(message);
  chat.append(element);
});

socket.on('welcome', (data) => {
  let { welcome, socket } = data;

  socket = socket.substr(0, 4).toUpperCase();

  let message = document.createElement('div');
  message.textContent = `${welcome}, ${socket}! We'll use the shorthand ${socket} for you.`;

  chat.append(message);
});

document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();

  let message = document.querySelector('#message');

  socket.emit('message', message.value);

  message.value = '';
});
