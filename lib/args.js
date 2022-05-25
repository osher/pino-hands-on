const { assign } = Object;

module.exports = ({
  process: { argv, exit },
  config = require('config'),
  minimist = require('minimist'),
  merge = require('lodash.merge'),
  cmds = require('./cmd')
}) => {
  const args = minimist(argv.slice(2), {
    alias: {
      h: 'help',
    },
  });

  config = merge(config, args);

  //TBD: validate config object
  const { 
    calc: {
      precision = 2,
      maxArgs = 99,
    },
    logger,
  } = config;

  if (args.h) {
    console.log(`
synompsis: calc [ cmd ]   [..operands]

supported commands: 
  - ${ Object.keys(cmds).join('\n  - ')}
    `)
    exit(1);
    return;
  }

  const [ command, ...operands ] = args._;

  const rejected = operands.filter(n => isNaN(Number(n)));
  if (rejected.length) throw assign(
    new Error('non-numeric operands'),
    { rejected },
  );

  return {
    precision,
    maxArgs,
    command,
    operands: operands.map(n => parseFloat(n)),
    logger,
  };
}
