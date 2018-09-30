/* eslint-disable global-require */
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import express from 'express';
import http from 'http';
import path from 'path';
import compression from 'compression';
import { Pool } from 'pg';
import LogManager from './Log/LogManager';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());

if (process.env.NODE_ENV !== 'production') {
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

app.get('/db', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM test_table');
    const results = { results: result ? result.rows : null };
    res.render('pages/db', results);
    client.release();
  } catch (err) {
    LogManager.getConsole().error(err);
    res.send(`Error ${err}`);
  }
});

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
