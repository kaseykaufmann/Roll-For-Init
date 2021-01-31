const nodemon = require('nodemon');
const path = require('path');

nodemon({
  execMap: {
    js: 'node'
  },
  script: path.join(__dirname, 'server/server'),
  ignore: [],
  watch: process.env.NODE_ENV === 'development' ? ['server/*'] : false,
  ext: 'js'
}).on('start', function () {
  console.log('[Nodemon] Server started!');
}).on('restart', function () {
  console.log('[Nodemon] Server restarted!');
}).once('exit', function () {
  console.log('[Nodemon] Shutting down server');
  process.exit();
});