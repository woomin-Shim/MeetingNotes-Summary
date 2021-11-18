const {createProxyMiddleware} = require('http-proxy-middleware');

//CORS ERROR when server and client Port number is different
module.exports = function (app) {
  app.use(["/speechtoText", '/socket.io', '/result'],createProxyMiddleware({
    target: "http://localhost:3030",
    changeOrigin: true,
}));
};
