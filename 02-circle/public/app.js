const socket = io('http://localhost:5000');

let active = false;
let deltaX;
let deltaY;

document
  .querySelector('.circle')
  .addEventListener('mousedown', function (event) {
    if (event.which === 1) {
      active = true;
      deltaX = event.pageX - $(this).offset().left;
      deltaY = event.pageY - $(this).offset().top;
    }
  });

document.addEventListener('mousemove', function (event) {
  if (active !== false) {
    socket.emit('drag', {
      left: event.pageX - deltaX,
      top: event.pageY - deltaY,
    });
  }
});

document.addEventListener('mouseup', function (event) {
  active = false;
});

socket.on('drag', function (data) {
  $('.circle').css({
    position: 'absolute',
    left: data.left + 'px',
    top: data.top + 'px',
  });
});
