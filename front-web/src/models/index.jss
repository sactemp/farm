import fs from 'fs';
import path from 'path';

const models = {};

// module.exports.define = function(schema) {
fs.readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach((file) => {
    // require(path.join(__dirname, file)).define(schema);
    const name = file.replace(/\..+$/, '');
    const modelConfig = Object.assign({}, require(path.join(__dirname, file)), name);

    models[name] = modelConfig;
  });
// };
module.exports = models;

