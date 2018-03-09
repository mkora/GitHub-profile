const http = require('http');
const app = require('./src/app');

http.createServer(app).listen(app.get('port'), () => {
  console.log(`Listening on http://localhost:${app.get('port')}`);
});
