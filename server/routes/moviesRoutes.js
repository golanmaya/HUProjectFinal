const router = require('express').Router();
const { mustLogin } = require('../controllers/authControllers');
const { getAllMovies, createNewMovie, updateMovie, deleteMovie, likeMovie, getMyMovies, getMovieById } = require('../controllers/movieController');

router.get('/', getAllMovies)
router.get("/my-movies", mustLogin, getMyMovies)
router.get("/:id", getMovieById)
router.post('/', mustLogin, createNewMovie)
router.patch('/:id', mustLogin, updateMovie)
router.patch('/like/:id', mustLogin, likeMovie)
router.delete('/:id', mustLogin, deleteMovie)


module.exports = router;