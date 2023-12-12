const loopback = require('loopback');
const boot = require('loopback-boot');
// const jwt = require('express-jwt');
// const jwks = require('jwks-rsa');

const app = module.exports = loopback();

// const authCheck = jwt({
//  secret: jwks.expressJwtSecret({
//    cache: true,
//    rateLimit: true,
//    jwksRequestsPerMinute: 5,
//    // YOUR-AUTH0-DOMAIN name e.g https://prosper.auth0.com
//    jwksUri: '{YOUR-AUTH0-DOMAIN}/.well-known/jwks.json'
//  }),
//  // This is the identifier we set when we created the API
//  audience: '{YOUR-API-AUDIENCE-ATTRIBUTE}',
//  issuer: '{YOUR-AUTH0-DOMAIN}',
//  algorithms: [ 'RS256' ]
// });

// console.log(authCheck);
// app.use(authCheck);

// catch error
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid token, or no token supplied!');
  } else {
    res.status(401).send(err);
    return next(req, res, next);
  }
});


app.start = () => {
  // start the web server
  return app.listen(() => {
    const baseUrl = app.get('url').replace(/\/$/, '');

    app.emit('started');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;

      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, (err) => {
  if (err) throw err;

  // start the server if `$ node server.js`
  // if (require.main === module)
  app.start();
});
