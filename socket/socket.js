var net = require('net');
var socketio = require('socket.io');

function onConnect (websocket) {
  var client = new net.Socket();
  client.on('data', websocket.emit.bind(websocket));
  websocket.on('data', client.write.bind(client));

  client.on('close', websocket.emit.bind(websocket, 'Connection closed by foreign host.'));
  websocket.on('disconnect', client.destroy.bind(client));

  client.connect(3000, 'avatar.outland.org', function () {
    console.log('connected');
  });
}

module.exports = function (server) {
  var io = socketio(server);
  io.on('connection', onConnect);
};
