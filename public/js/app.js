document.addEventListener('DOMContentLoaded', function () {

  var socket = io.connect();
  var el = document.getElementById('content');
  var userInput = document.getElementById('userInput');

  function renderText (text) {
    el.innerHTML += text;
  }

  socket.on('data', renderText);

  userInput.addEventListener('submit', function (event) {
    event.preventDefault();
    var val = event.target[0].value;
    if (!val) return false;

    renderText('\n> ' + val);
    socket.emit('data', val);
    event.target[0].value = '';
  });

});
