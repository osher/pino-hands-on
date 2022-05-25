module.exports = ({
}) => {
  const log = {
    emit: (...a) => console.log(...a),
    debug: (...a) => log.emit('info', ...a),
    info: (...a) => log.emit('info', ...a),
    warn: (...a) => log.emit('info', ...a),
    error: (...a) => log.emit('info', ...a),
    fatal: (...a) => log.emit('info', ...a),
    of: () => log,
  }

  return log;
}
