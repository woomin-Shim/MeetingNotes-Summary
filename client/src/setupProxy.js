const {createProxyMiddleware} = require('http-proxy-middleware');


module.exports = function (app) {
  app.use(["/speechtoText"],createProxyMiddleware({
    target: 'http://localhost:3030',
    changeOrigin: true,
}));
};
