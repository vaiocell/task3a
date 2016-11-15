(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('express')) :
  typeof define === 'function' && define.amd ? define(['express'], factory) :
  (factory(global.express));
}(this, (function (express) { 'use strict';

express = 'default' in express ? express['default'] : express;

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

})));
//# sourceMappingURL=index.umd.js.map
