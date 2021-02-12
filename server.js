const nodemon = require('nodemon');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({
  path: path.resolve(__dirname, './secret.env'),
  debug: process.env.DEBUG
});

nodemon({
  script: path.join(__dirname, 'server/server'),
  ext: 'js',
  execMap: {
    js: 'node'
  },
  ignore: [],
  legacyWatch: process.env.NODE_ENV === 'development' ? ['server/*'] : false,
  // watch: ,
})

nodemon.on('start', function () {
  console.log('[Nodemon] Server started!');
}).on('crash', function (err) {
  console.log('[Nodemon] Server crashed: ', err);
}).on('restart', function (files) {
  console.log('[Nodemon] Server restarted due to: ', files);
}).once('quit', function () {
  console.log('[Nodemon] Shutting down server');
  process.exit()
});