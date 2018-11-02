
var  http = require('http');

http.createServer(app).listen(3000, function () {
  console.log("Server ready at http://localhost:3000");
});