module.exports = ({
  config,
  logger,
  cmds = require('./cmd')
}) => {
  const log = logger.of('calc');

  log.debug('creating calculator')

  return {
    exec: (command, operands) => {
      logger.debug({ command, operands }, 'executing command');
      assureCmd(command, cmds);

      return cmds[command](...operands)
    },
  };
};

function assureCmd(command, cmds) {
  if ('function' != typeof cmds[command]) {
    const err = new Error(`
      Command not supported.
      Supported commands are:
        - ${ Object.keys(cmds).join('\n  - ')}
    `.replace(/\n {6}/g, '\n'));

    err.command = command;
    throw err;
  }
}
