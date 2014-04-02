var connect = require('connect')
  , serveStatic = require('serve-static')
  , makeJade = require('./lib/processor/jade.js')
  , path = require('path');

module.exports = function(root) {
  var app = connect();

  app.use(function(req, res, next) {
    if(req.url == '/current-time') {
      res.write((new Date()).toISOString());
      res.end('\n');
    } else {
      next();
    }
  })
  app.use(serveStatic(root));
  app.use(makeJade(root));

  return app;
}
