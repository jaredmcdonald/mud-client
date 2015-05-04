var net = require('net');
var socketio = require('socket.io');
var ansi_up = require('ansi_up');

function onConnect (websocket) {
  var client = new net.Socket({
    readable: true,
    writeable: true
  });
  client.on('data', function (data) {
    websocket.emit('data', ansi_up.ansi_to_html(data.toString()));
  });
  websocket.on('data', function (data) {
    client.write(data + '\n');
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
