document.addEventListener('DOMContentLoaded', function () {

  var socket = io.connect();
  var el = document.getElementById('content');

  socket.on('data', function (data) {
    el.innerHTML += data;
  });

});
