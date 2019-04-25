// import booksController from '../controllers/books';
// import authController from '../middleWare/auth';
// import usersController from '../controllers/users';
const authMiddleWare = require('../middlewares/auth');

const movieControllers = require('../controllers/movies')
const userControllers = require('../controllers/user')


module.exports = (app) => {
  app.post('/api/auth/register', userControllers.registerUser);
  app.post('/api/auth/login',  userControllers.loginUser);
  app.use('/api/', authMiddleWare.auth);
  app.post('/api/movies', movieControllers.createMovie);
  app.get('/api/movies', movieControllers.getMovies);
  app.get('/api/movies/:movieId', movieControllers.getASingleMovie);
  app.put('/api/movies/:movieId',  movieControllers.updateASingleMovie);
  app.delete('/api/movies/:movieId',  movieControllers.deleteASingleMovie);
};

