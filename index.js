var connect = require('connect')
  , serveStatic = require('serve-static');

module.exports = function(path) {
  var app = connect();

  app.use(function(req, res, next) {
    if(req.url == '/current-time') {
      res.write((new Date()).toISOString());
      res.end('\n');
    } else {
      next();
    }
  })

  app.use(serveStatic(path));

  return app;
}
