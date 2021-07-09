const socket = io('http://localhost:5000');

let active = false;
let offsetX;
let offsetY;

document.querySelector('.circle').addEventListener('mousedown', (event) => {
  active = true;
  offsetX = event.offsetX;
  offsetY = event.offsetY;
});

document.addEventListener('mousemove', (event) => {
  if (active !== false) {
    socket.emit('drag', {
      left: event.pageX - offsetX,
      top: event.pageY - offsetY,
    });
  }
});

document.addEventListener('mouseup', (event) => {
  active = false;
});

socket.on('update', (data) => {
  let circle = document.querySelector('#item');

  circle.style.left = `${data.left}px`;
  circle.style.top = `${data.top}px`;
});
