const router = require('express').Router();
const { mustLogin } = require('../controllers/authControllers');
const { postReview, updateReview, deleteReview } = require('../controllers/reviewsController');

router.post('/:id', mustLogin, postReview)
router.patch('/:id', mustLogin, updateReview)
router.delete('/:id', mustLogin, deleteReview)

module.exports = router;