require('dotenv').config();
require('@babel/polyfill');
require('@babel/register');

require('./lib/manager').default.init();

process.on('SIGINT', () => {
  console.error('\nCaught interrupt signal, exiting.');
  process.exit();
});
