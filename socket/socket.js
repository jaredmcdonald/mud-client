'use strict';

var net = require('net');
var socketio = require('socket.io');
var ansi_up = require('ansi_up');
var hostname = process.argv[2] || process.env.REMOTE_HOSTNAME;
var port = process.argv[3] || process.env.REMOTE_PORT;

function onConnect (websocket) {
  var client = new net.Socket({
    readable: true,
    writeable: true
  });
  client.on('data', function (data) {
    websocket.emit('data', ansi_up.ansi_to_html(data.toString(), {
      use_classes: true
    }));
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

  client.connect(port, hostname, function () {
    console.log('connected');
  });
}

module.exports = function (server) {
  var io = socketio(server);
  io.on('connection', onConnect);
};
