document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var SCROLLBACK_LINES = 4000;
  var CLEAN_INTERVAL = 20000;

  var socket = io.connect();
  var el = document.getElementById('content');
  var userInput = document.getElementById('userInput');

  // Render something and update scroll position
  function renderText (text) {
    el.innerHTML += text;
    updateScroll();
  }

  // Keep scroll up to date with input
  function updateScroll () {
    window.scrollTo(0, document.body.scrollHeight);
  }

  // Clean up scrollback
  function cleanScrollback () {
    var arr = el.innerHTML.split('\n');
    if (arr.length <= SCROLLBACK_LINES) {
      return false;
    };
    el.innerHTML = arr.slice(arr.length - SCROLLBACK_LINES).join('\n');
  }

  // handle user input
  function handleInput (event) {
    event.preventDefault();

    var input = event.target[0];
    var val = input.value;

    socket.emit('data', val);

    input.value = '';
    renderText('\n&gt; ' + val + '\n\n');
    updateScroll();
  }

  socket.on('data', renderText);

  window.setInterval(cleanScrollback, CLEAN_INTERVAL);

  userInput.addEventListener('submit', handleInput);

  userInput[0].focus();

});
