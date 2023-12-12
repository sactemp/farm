const path = require('path');

export default {
  port: 19010,
  title: 'Ферма - онлайн',
  cookieName: 'farmAuthApi',
  useSSR: 1,
  session: {
    key: 'sid',
    secret: 'dsadasdas',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: null,
    },
  },
  realtime: { url: 'ws://10.70.100.231:19040' },
  baseCatalogFilePath: path.join(__dirname, '../../downloads'),
  restapi: {
    adapter: 'restapi',
    host2: '192.168.1.17',
    host: '10.70.100.231',
    port: 19000,
  },
  postgres: {
    adapter: 'postgres',
    host: '10.70.100.231',
    port: 5432,
    database: 'farm',
    username: 'farm_user',
    password: '12345',
  },
};
