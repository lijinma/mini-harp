module.exports = makeLess;

function makeLess(root) {
  return function(req, res, next) {
  	var path = require('path')
      , fs = require('fs')
      , less = require('less');
    if (path.extname(req.url) == '.css') {
      var lessFile = root + '/' + path.basename(req.url, '.css') + '.less'
        , cssFile = root + '/' + req.url;
      fs.readFile(cssFile, {encoding: "utf8"}, function(err, cssData) {
        if (!err) {
          res.statusCode = 200;
          res.setHeader('Content-Length', cssData.toString().length);
          res.setHeader('Content-Type', 'text/html; charset=UTF-8');
          res.end(cssData);
          return;
        }
        fs.readFile(lessFile, {encoding: "utf8"}, function(err, lessData) {
          if (!err) {
            less.render(lessData, function(err, css) {
              if (err) throw err;
                res.statusCode = 200;
                res.setHeader('Content-Length', css.toString().length);
                res.setHeader('Content-Type', 'text/html; charset=UTF-8');
                res.end(css);
                return;
            })
          }
          res.statusCode = 404;
          res.end();
          return;
        })
      })
    } else {
      next()
    }
  }
}