var controller = require('./controllers.js');
var router = require('express').Router();

router.get('/reviews/', controller.getReviews);
router.get('/reviews/meta', controller.getReviewsMeta);

module.exports = router;