// var net = require('net');
var telnet = require('telnet-client');
var socketio = require('socket.io');
var params = {
  host: 'avatar.outland.org',
  port: 3000
}


function onConnect (websocket) {
  var connection = new telnet();

  connection.on('ready', function (prompt) {
    websocket.emit('data', prompt);
    websocket.on('data', function (data) {
      connection.exec(data, function (response) {
        websocket.emit('data', response);
      });
    });
  });

  connection.on('timeout', function() {
    console.log('socket timeout!')
    connection.end();
  });

  connection.on('close', function() {
    console.log('connection closed');
  });

  connection.connect(params);


  // var client = new net.Socket({
  //   writeable: true,
  //   readable : true
  // });
  // client.on('data', function (data) {
  //   websocket.emit('data', data.toString());
  // });
  // websocket.on('data', function (data) {
    // client.write(data);
  // });
  // client.on('close', function () {
  //   websocket.emit('Connection closed by foreign host.');
  // });
  // websocket.on('disconnect', function () {
    // client.destroy();
  // });
  // client.connect(3000, 'avatar.outland.org', function () {
  //   console.log('connected');
  // });
}

module.exports = function (server) {
  var io = socketio(server);
  io.on('connection', onConnect);
};
