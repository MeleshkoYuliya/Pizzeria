const info = (...args) => console.log('\x1b[34m%s\x1b[0m', '[INFO]', ...args);

const debug = (...args) => console.log('[DEBUG]', ...args);

const error = (...args) => console.error('\x1b[31m%s\x1b[0m', '[ERROR]', ...args);

module.exports = {
  info,
  debug,
  error,
}
