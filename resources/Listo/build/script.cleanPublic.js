var
  shell = require('shelljs'),
  path = require('path')

shell.rm('-rf', path.resolve(__dirname, '../../../public/*'))
shell.rm('-rf', path.resolve(__dirname, '../../../public/.*'))
console.log(' Cleaned build artifacts.\n')
