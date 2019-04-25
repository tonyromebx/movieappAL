const db = require('../models/index');

module.exports = {
 
  createMovie(req, res) {
    const { name, summary, rating, releaseDate, Directors } = req.body;

    var newMovie = db.movie({
        name,
        summary,
        rating,
        releaseDate,
        Directors,
        created_at: Date.now(),
        updated_at: Date.now()
    });

    newMovie.save((error) => {
        if (error) return res.status(500).send({message: error});

        return res.status(201).send({'message' : 'saved successfully'})
    })
  },

  getMovies(req, res) {
    const name = req.query.name;
    if (name === undefined) {
        return db.movie.find({}, (error, movieList) => {
            if (error) return res.status(200).send({ movies: [] })

            return res.status(200).send({movies: movieList })
        });
    }

    db.movie.find({'name': name}, (error, movie) => {
        if (error) return res.status(404).send({message: 'movie does not exist'});

        return res.status(200).send({'data': { movie }})
    });

  },

  getASingleMovie(req, res) {

        db.movie.findById(req.params.movieId, (error, movie) => {
            if (error) return res.status(404).send({message: 'movie does not exist'});

            return res.status(200).send({'data': { movie }})
        });
    },

    updateASingleMovie(req, res) {
        const { name, summary, rating, releaseDate } = req.body;

        db.movie.findByIdAndUpdate(req.params.movieId, {
            summary,
            rating,
            releaseDate,
        }, (error, movie) => {
            if (error) return res.status(404).send({message: error});
            return res.status(200).send({message: 'movie updated successfully'});
        });
    },

    deleteASingleMovie(req, res) {
        db.movie.findByIdAndRemove(req.params.movieId, (error,) => {
            if (error) return res.status(404).send({message: 'movie does not exist'});
            return res.status(200).send({message: 'movie deleted successfully'});
        });
    },
};
