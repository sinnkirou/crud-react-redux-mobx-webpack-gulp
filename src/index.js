/* eslint-disable no-console */
/* eslint-disable global-require */
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import express from 'express';
import http from 'http';
import path from 'path';
import compression from 'compression';
import { server as WebSocketServer } from 'websocket';
import LogManager from './Log/LogManager';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());

// comment this block when using gulp
if (process.env.NODE_ENV !== 'production') {
  // loads environment variables from a .env file into process.env
  require('dotenv').config();

  // Applying webpack hot middleware
  const webpack = require('webpack');
  const webpackConfig = require('../webpack.dev.js');
  webpackConfig.forEach(config => {
    if (config.target === 'web') {
      const compiler = webpack(config);
      app.use(
        require('webpack-dev-middleware')(compiler, {
          noInfo: true,
          publicPath: config.output.publicPath
        })
      );
      app.use(require('webpack-hot-middleware')(compiler));
    }
  });
}

// Serving static files
app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, '../dist/views'));
app.set('view engine', 'pug');

app.get('*', (req, res) => {
  res.render('index', { title: 'Post a post' });
});

// stop server during local development
app.get('/exit', (req, res) => {
  if (process.env.PORT) {
    res.send('Sorry, the server denies your request');
  } else {
    res.send('shutting down');
    process.exit(0);
  }
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// hide powered by express
app.disable('x-powered-by');

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      LogManager.getConsole().error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      LogManager.getConsole().error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  LogManager.getConsole().info(`Listening on ${bind}`);
}

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

const wsServer = new WebSocketServer({
  httpServer: server,
  // You should not use autoAcceptConnections for production
  // applications, as it defeats all standard cross-origin protection
  // facilities built into the protocol and the browser.  You should
  // *always* verify the connection's origin and decide whether or not
  // to accept it.
  autoAcceptConnections: false,
  maxReceivedFrameSize: 140000,
  maxReceivedMessageSize: 10 * 1024 * 1024
});

function originIsAllowed() {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}

wsServer.on('request', request => {
  if (!originIsAllowed()) {
    // Make sure we only accept requests from an allowed origin
    request.reject();
    console.log(`${new Date()} Connection from origin ${request.origin} rejected.`);
    return;
  }

  const connection = request.accept('echo-protocol', request.origin);
  console.log(`${new Date()} Connection accepted.`);
  connection.on('message', message => {
    console.dir(message);
    if (message.type === 'utf8') {
      console.log(`Server Received Message: ${message.utf8Data}`);
      connection.sendUTF(message.utf8Data);
    } else if (message.type === 'binary') {
      console.log(`Server Received Binary Message of ${message.binaryData.length} bytes`);
      connection.sendBytes(message.binaryData);
    }
  });
  connection.on('close', (reasonCode, description) => {
    console.log(
      `${new Date()} Peer ${
        connection.remoteAddress
      } disconnected.reasonCode:${reasonCode}; description;${description}`
    );
  });
  connection.on('error', () => {
    console.log(`${new Date()} Peer ${connection.error} disconnected.`);
  });
});
