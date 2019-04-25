/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
import axios from 'axios';
import { useState } from 'react';

import styles from './MoviesDetails.scss';
import { cover, bdc } from '../../assets/images';
import Modal from '../../components/PlainModal/PlainModal';
import isAdmin from '../../utils/isAdmin';

const fetchMovie = async (movieId) => {
	try {
		const response = await axios.get(`http://localhost:2000/api/movies/${movieId}`,
			{
				headers: {
					token: localStorage.getItem('token')
				}
			});
		if (response.status === 200) {
			return response.data.data.movie;
		}
	} catch (error) {
		if (error.response.status === 400) {
			return [];
		}
	}
};

const deleteMovie = async (movieId, props) => {
	try {
		const response = await axios.delete(`http://localhost:2000/api/movies/${movieId}`,
			{
				headers: {
					token: localStorage.getItem('token')
				}
			});
		if (response.status === 200) {
            props.history.push('/movies');
		}
	} catch (error) {
		if (error.response.status === 400) {
			return [];
		}
	}
};

const editMovies = async (movieId, movieDetails) => {
	try {
        const response = await axios.put(`http://localhost:2000/api/movies/${movieId}`, movieDetails,
        {
            headers: {
                token: localStorage.getItem('token')
            }
        });
		if (response.status === 200) {
			return { message: response.data.message, status: response.status };
		}
	} catch (error) {
		if (error.response.status === 400) {
			return { message: error.response.data.message, status: error.response.status };
		}
	}
};

const MoviesDetails = (props) => {

    if (localStorage.getItem('token') === null) {
        return props.history.push('/')
    }

	const [movie, setMovie] = useState({
		Directors: []
    });
    const [isFetchedOnes, setIsFetchedOnes] = useState(false);
    const [showAddMoviesModal, setShowAddMoviesModal] = useState(false);
	const [movieDetails, setMovieDetails] = useState({
		name: movie.name,
		summary: movie.summary,
		rating: movie.rating,
		releaseDate: movie.releaseDate,
    });

    const { name, summary, rating, releaseDate } = movieDetails;

	if (!isFetchedOnes) {
		fetchMovie(props.match.params.id).then((result) => {

			setMovie(result);
			setIsFetchedOnes(true);
		}
		);
    }

    const handleMovieDetails = ({ target: { name, value } }) => {
		setMovieDetails({
			...movieDetails,
			[name]: value
		});
    };
    
    const handleEditMovieDetails = async () => {
		const { message, status } = await editMovies(props.match.params.id, movieDetails);
        setShowAddMoviesModal(false);
        setIsFetchedOnes(false);
	};
	return (
		<div styleName="movie">
			<div className="movie__container">

				<div styleName="movie__image-group">
					<div styleName="movie__backdrop-image-container">
						<img src={cover} alt="backdrop" styleName="movie__backdrop-image" />
					</div>
					<div styleName="movie__postal-image-container">
						<img src={bdc} alt="poster" styleName="movie__postal-image" />
					</div>
				</div>

				<div styleName="movie__content">

					<h2 styleName="movie__title">{movie.name}</h2>

					<p styleName="movie__description">{movie.summary}</p>

					<p className="movie__status">
						<span>Rating: {movie.rating} </span>
					</p>

					<p className="movie__release-date">
						<span>Release Date: {new Date(movie.releaseDate).toDateString()} </span>
					</p>
					{ movie.Directors && <p style={{ display: 'flex' }}>
						Directors:
                <span style={{ display: 'flex' }}>
				{ 
                    movie.Directors.map(item => <p className="card-text mr-1">{`${item},`}</p>)}
			        </span> 
					</p>
                    }
                   { isAdmin(localStorage.getItem('token')) && <div>
                    <button onClick={() => setShowAddMoviesModal(true)} className="btn btn-outline-primary my-2 my-sm-0" type="button">Edit</button>
                    <button onClick={() => deleteMovie(props.match.params.id, props)} className="btn btn-outline-danger my-2 my-sm-0" type="button">Delete</button>
                    </div>}
				</div>
			</div>

            <Modal exposeIsModalVisible={setShowAddMoviesModal} shouldModalBeVisible={showAddMoviesModal}>
				<form>
					<h2 className="text-center text-primary">Edit Movies</h2>
					<hr />
					<div className="form-group">
						<input value={name || movie.name} onChange={handleMovieDetails} name="name" required type="text" className="form-control" placeholder="Title" />
					</div>
					<div className="form-group">
						<input value={summary || movie.summary} onChange={handleMovieDetails} name="summary" required type="text" className="form-control" placeholder="Summary" />
					</div>
					<div className="form-group">
						<input value={releaseDate || movie.releaseDate} onChange={handleMovieDetails} name="releaseDate" required type="date" className="form-control" placeholder="Release Date" />
					</div>
					<div className="form-group">
						<input value={rating || movie.rating} onChange={handleMovieDetails} name="rating" required type="number" className="form-control" placeholder="Rating" />
					</div>
					<div className="form-group text-center">
						<button onClick={handleEditMovieDetails} className="btn btn-success mr-2" type="button">Save</button>
					</div>
				</form>
			</Modal>
		</div>
	);
};


export default (CSSModules(MoviesDetails, styles));
