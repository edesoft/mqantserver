var shell = require('shelljs');
shell.config.verbose = true;

shell.cd('./src/server');
shell.exec('fresh');
