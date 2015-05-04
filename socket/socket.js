var net = require('net');
var socketio = require('socket.io');

function onConnect (websocket) {
  var client = new net.Socket();
  client.on('data', function (data) {
    websocket.emit('data', data.toString());
  });
  websocket.on('data', function (data) {
    client.write(data);
  });
  client.on('close', function () {
    websocket.emit('Connection closed by foreign host.');
  });
  websocket.on('disconnect', function () {
    client.destroy();
  });
  client.connect(3000, 'avatar.outland.org', function () {
    console.log('connected');
  });
}

module.exports = function (server) {
  var io = socketio(server);
  io.on('connection', onConnect);
};
