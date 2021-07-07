const Router = require('koa-router');
const router = new Router();
const mockOffers = require('../mockData/offers.json');

/**
  * Create router.verb() methods, where verb is one of the HTTP verbs such as router.get() or router.post()
	* https://github.com/koajs/router/blob/master/API.md#routergetputpostpatchdeletedel--router
*/
router.get('/loyalty/v1/members/:memberId/offers', ctx => {
	const offers = mockOffers.map((offer, index) => {
		return {
			...offer,
		}
	})

	// Given the url contains the memberId query parameter, return the offers.
  if (ctx.params.memberId) {
    ctx.ok({
      offers,
    });
  }
});

module.exports = router.routes();
