import express from 'express';

var app = express();

app.get('/', function (req, res) {

  res.json({
    url: 1,
    userName: 'vaiocell'
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
//# sourceMappingURL=index.es6.js.map
