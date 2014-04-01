var connect = require('connect');

module.exports = function() {
  var app = connect();
  app.use(function(req, res, next) {
    if(req.url == '/current-time') {
      res.write((new Date()).toISOString());
      res.end('\n');
    } else {
      next();
    }
  })
  return app;
}
