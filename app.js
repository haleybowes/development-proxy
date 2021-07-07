const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
const respond = require('koa-respond');
const proxy = require('koa-better-http-proxy');
const app = new Koa();
const router = new Router();
const helmet = require('koa-helmet');
const static = require('koa-static');
const logger = require('koa-logger')

app.use(helmet());
app.use(cors());
app.use(respond());

require('./routes/index.js')(router);
app.use(router.routes());
app.use(router.allowedMethods());

// Static file serving middleware
app.use(static('.'));

// Logging
app.use(logger())

/**
  * This method sets up our proxy and allows us to manipulate the response if the url includes 'urlToManipulate`.
  * In the case below, we are adding the key 'name' to the response object for the url which includes 'points'.
*/

const urlToProxy = '';

app.use(
  proxy(urlToProxy, {
    userResDecorator: function (proxyRes, proxyResData, ctx) {
      const urlToManipulate = '';
      if (ctx.url.includes(urlToManipulate)) {
        return ctx.throw(400,'Custom Error Message Goes Here!');
      }
      return proxyResData;
    },
  }),
);

app.listen(3003);
