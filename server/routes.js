var controller = require('./controllers.js');
var router = require('express').Router();

router.get('/', controller.getReviews);
router.get('/meta/', controller.getReviewsMeta);
// router.post('/', controller.postReview);
// router.put('/:review_id/helpful/', controller.putHelpful);
// router.put('/:review_id/report/', controller.putReport);

module.exports = router;