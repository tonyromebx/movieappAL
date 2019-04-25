/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-one-expression-per-line */
import axios from 'axios';
import { useState } from 'react';

import NavBar from '../../components/NavBar/NavBar';
import styles from './Movies.scss';
import { bg } from '../../assets/images';
import Modal from '../../components/PlainModal/PlainModal';

const renderMovieCard = (movie, handleClick) => (
	<div role="presentation" key={movie.name + movie.summary} styleName="movie-card" onClick={() => handleClick(movie._id)} className="card">
		<img src={bg} className="card-img-top" alt="..." />
		<div className="card-body">
			<h5 className="card-title">Title:{movie.name}</h5>
			<p className="card-text">Summary:{movie.summary}</p>
			<p className="card-text">Release Date: { new Date(movie.releaseDate).toDateString()}</p>
			<p className="card-text">Rating: {movie.rating}</p>
			{/* <div style={{ display: 'flex' }}>
				{ movie.Directors.map(item => <p className="card-text mr-1">{`${item},`}</p>)}
			</div> */}
		</div>
	</div>
);

const fetchMovies = async () => {
	try {
		const response = await axios.get('http://localhost:2000/api/movies',
			{
				headers: {
					token: localStorage.getItem('token')
				}
			});
		if (response.status === 200) {
			return response.data.movies;
		}
	} catch (error) {
		if (error.response.status === 400) {
			return [];
		}
	}
};


const saveMovies = async (movieDetails) => {
	try {
        const response = await axios.post('http://localhost:2000/api/movies', movieDetails,
        {
            headers: {
                token: localStorage.getItem('token')
            }
        });
		if (response.status === 201) {
			return { message: response.data.message, status: response.status };
		}
	} catch (error) {
		if (error.response.status === 400) {
			return { message: error.response.data.message, status: error.response.status };
		}
	}
};


const MoviesPage = (props) => {

    if (localStorage.getItem('token') === null) {
        return props.history.push('/')
    }
	const [moviesList, setMoviesList] = useState([]);
	const [isFetchedOnes, setIsFetchedOnes] = useState(false);
	const [showAddMoviesModal, setShowAddMoviesModal] = useState(false);
	const [movieDetails, setMovieDetails] = useState({
		name: '',
		summary: '',
		rating: '',
		releaseDate: '',
		Directors: [],
    });
    
    const { name, summary, rating, releaseDate,  Directors } = movieDetails;

	const handleClick = movieId => props.history.push(`/movies/${movieId}`);

	if (!isFetchedOnes) {
		fetchMovies().then((result) => {
			setMoviesList(result);
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

	const handleSaveMovieDetails = async () => {
		const { message, status } = await saveMovies(movieDetails);
        setShowAddMoviesModal(false);
        setIsFetchedOnes(false);
	};
    
	return (
		<div>
			<NavBar {...props} showAddMoviesModal={() => setShowAddMoviesModal(true)} />
			{moviesList && (
				<div styleName="gallary">

					{moviesList.map(item => (
						renderMovieCard(item, handleClick)

					))}
				</div>
			)}

			<Modal exposeIsModalVisible={setShowAddMoviesModal} shouldModalBeVisible={showAddMoviesModal}>
				<form>
					<h2 className="text-center text-primary">Add Movies</h2>
					<hr />
					<div className="form-group">
						<input value={name} onChange={handleMovieDetails} name="name" required type="text" className="form-control" placeholder="Title" />
					</div>
					<div className="form-group">
						<input value={summary} onChange={handleMovieDetails} name="summary" required type="text" className="form-control" placeholder="Summary" />
					</div>
					<div className="form-group">
						<input value={releaseDate} onChange={handleMovieDetails} name="releaseDate" required type="date" className="form-control" placeholder="Release Date" />
					</div>
					<div className="form-group">
						<input value={rating} onChange={handleMovieDetails} name="rating" required type="number" className="form-control" placeholder="Rating" />
					</div>
					<div className="form-group">
						<input value={Directors} onChange={handleMovieDetails} name="Directors" required type="text" className="form-control" placeholder="Directors" />
					</div>

					<div className="form-group text-center">
						<button onClick={handleSaveMovieDetails} className="btn btn-success mr-2" type="button">Save</button>
					</div>
				</form>
			</Modal>

		</div>
	);
};


export default (CSSModules(MoviesPage, styles));
