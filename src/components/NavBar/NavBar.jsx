/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
import { useState, useEffect } from 'react';
import axios from 'axios';

import styles from './NavBar.scss';
import isAdmin from '../../utils/isAdmin';

const signInApiCall = async (userDetails, history) => {
	try {
		const response = await axios.post('http://localhost:2000/api/auth/login', userDetails);
		if (response.status === 200) {
			localStorage.setItem('token', response.data.token);
			history.push('/movies');
			return { message: response.data.message, status: response.status };
		}
	} catch (error) {
		if (error.response.status === 401) {
			return { message: error.response.data.message, status: error.response.status };
		}
	}
};
const NavBar = ({ history, showAddMoviesModal }) => {
	const [userDetails, setUserDetails] = useState({
		username: '',
		password: ''
	});

	const [responseMessage, setResponseMessage] = useState('');
    const [responseStatus, setResponseStatus] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token'));

	const handleUserDetails = ({ target: { name, value } }) => {
		setResponseMessage('');
		setUserDetails({
			...userDetails,
			[name]: value
		});
	};

	const handleSignIn = async () => {
		setResponseMessage('');
		const { message, status } = await signInApiCall(userDetails, history);
		setResponseMessage(message);
		setResponseStatus(status);
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken('');
        setResponseMessage('');
        history.push('/');
    };

    useEffect(() => {
		setToken(localStorage.getItem('token'));
	}, [localStorage.getItem('token')]);

	return (
		<nav styleName="nav" className="navbar navbar-expand-lg navbar-light bg-light">
			<a className="navbar-brand" href="/">Movie app</a>
            <div>
            {token && isAdmin(token) && <button onClick={showAddMoviesModal} className="btn btn-outline-success my-2 my-sm-0" type="button">Add Movies</button>}
            {token && <button onClick={handleLogout} className="btn btn-outline-success my-2 my-sm-0" type="button">Logout</button>}
            </div>

            {!token
            && (
<div>
				<form className="form-inline my-2 my-lg-0">
					<input name="username" onChange={handleUserDetails} className="form-control mr-sm-2" type="text" placeholder="username" />
					<input name="password" onChange={handleUserDetails} className="form-control mr-sm-2" type="password" placeholder="password" />
					<button onClick={handleSignIn} className="btn btn-outline-success my-2 my-sm-0" type="button">Login</button>
				</form>
				{ responseMessage && <div styleName="message-alert" className={`alert alert-${responseStatus === 200 ? 'success' : 'danger'}`} role="alert">{responseMessage}</div>}
</div>
)}
		</nav>
	);
};

export default (CSSModules(NavBar, styles));
