module.exports = makeJade;

function makeJade(root) {
  return function(req, res, next) {
    var jade = require('jade')
      , fs = require('fs')
      , path = require('path');

    if(path.extname(req.url) == '.html') {
        var htmlFile = root + '/' + req.url
          , jadeFile = root + '/' + path.basename(req.url, '.html') + '.jade';

      fs.readFile(htmlFile, {encoding: "utf8"}, function(err, data) {

        if (! err) {
          res.statusCode = 200;
          res.setHeader("Content-Length", data.toString().length);
          res.setHeader("Content-Type", 'text/html; charset=UTF-8');
          res.end(data);
          return;
        }

        jade.renderFile(jadeFile, null , function(err, html) {
          if (! err) {
            res.statusCode = 200;
            res.setHeader("Content-Length", html.toString().length);
            res.setHeader("Content-Type", 'text/html; charset=UTF-8');
            res.end(html);
            return;
          }
          res.statusCode = 404;
          res.end();
          return;
        })
      })
    } else {
      next();
    }
  }
}