# mud-client

A browser-based [MUD](http://en.wikipedia.org/wiki/MUD) client. Essentially proxies TCP to a websocket to the client.

## environment

- `REMOTE_HOSTNAME`: hostname to which to connect (e.g. `avatar.outland.org`)
- `REMOTE_PORT`: port to which to connect (e.g. `3000`)

Or you can supply these as command line arguments to the start script, in that order. Command line arguments will take precedence.

## start

    npm install
    npm start

By default the server starts on port 3000, but you can set that with the `PORT` environment variable.

