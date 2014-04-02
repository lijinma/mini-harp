var connect = require('connect')
  , serveStatic = require('serve-static')
  , makeJade = require('./lib/processor/jade.js')
  , makeLess = require('./lib/processor/less.js')
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
  .use(function(req, res, next) {
    if (req.url == '/') {
      req.url = '/index.html';
    }
    next();
  })
  .use(function(req, res, next) {
    var forbiddenTypes = [".jade", ".less"];
    if (forbiddenTypes.indexOf(path.extname(req.url)) > -1) {
      res.statusCode = 404;
      res.end();
    } else {
      next();
    }
  })
  .use(serveStatic(root))
  .use(makeJade(root))
  .use(makeLess(root));

  return app;
}
