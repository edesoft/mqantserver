var shell = require('shelljs');
shell.config.verbose = true;

shell.cd('./src/server');
shell.exec('go build');

// for linux
shell.mv('server', '../../bin/');
// for windows
shell.mv('server.exe', '../../bin/');
