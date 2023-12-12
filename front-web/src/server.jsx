import fs from 'fs';
import path from 'path';
import models from './models';
import config from './config';
import Server from './lib/server';
import App from './components/App/App';
import reducers from './redux/reducers';

// \x1b[31m - red
// \x1b[33m - yelloy
// \x1b[36m - green

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
// const accessLogStream = process.stdout;

const consoleLog = (params) => {
  // accessLogStream.write(params);
  if (params.text) console.info(`\x1b[36m${params.text}\x1b[0m`);
  else console.log('\x1b[31m ERROR', params, '\x1b[0m');
};

const app = new Server({
  accessLogStream,
  staticPath: path.join(__dirname, '../public'),
  App,
  config,
  reducers,
  consoleLog,
  authParams: {
    connectionParams: config.restapi,
    metadata: models.users,
    usernameField: 'login',
    passwordField: 'password',
    calcPassword: (p) => p,
  },
});
app.start();
