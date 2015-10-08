var express = require('express')
  , child   = require('child_process')
  , app     = express()
  , server  = app.listen(8080);

app.use(express.static('public'));
app.get('/data/:num', function (req, res) {
  child.exec('./generator ' + req.params.num, function (err, stdout, stderr) {
    res.send(stdout)
  });
});
