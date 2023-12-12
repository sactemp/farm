require('@babel/register');

console.log('Start server');
const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
const path = require('path');

const projectBasePath = path.resolve(__dirname, './src');

['.css', '.less', '.sass', '.ttf', '.woff', '.woff2'].forEach((ext) => {
  require.extensions[ext] = () => true;
});

global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('./webpack-isomorphic-tools-configuration'))
  .server(projectBasePath, () => require('./src/server.jsx'));
    // webpack-isomorphic-tools is all set now.
    // here goes all your web application code
    // (it must reside in a separate *.js file
    //  in order for the whole thing to work)
