import { useState } from 'react';
import axios from 'axios';

import styles from './Home.scss';
import NavBar from '../../components/NavBar/NavBar';
import Toaster from '../../components/Toaster/Toaster';


const signUpApiCall = async (userDetails) => {
	try {
		const response = await axios.post('http://localhost:2000/api/auth/register', userDetails);
		if (response.status === 201) {
			return { message: response.data.message, status: response.status };
		}
	} catch (error) {
		if (error.response.status === 400) {
			return { message: error.response.data.message, status: error.response.status };
		}
	}
};

export function Home(props) {
	const [sigUpFormStatus, setSigUpFormStatus] = useState(false);

	const [userDetails, setUserDetails] = useState({
		username: '',
		password: ''
	});

	const [responseMessage, setResponseMessage] = useState('');
	const [responseStatus, setResponseStatus] = useState('');

	const handleUserDetails = ({ target: { name, value } }) => {
		setResponseMessage('');
		setUserDetails({
			...userDetails,
			[name]: value
		});
	};

	const handleSignup = async () => {
		setResponseMessage('');
		const { message, status } = await signUpApiCall(userDetails);
		setResponseMessage(message);
		setResponseStatus(status);
	};

	return (
		<div>
			<NavBar {...props} />
			<div className="container mt-5">
				<div styleName="welcome-message-wrapper">
					<h1>Find your favorite movies</h1>
					<p className="lead">All you need to do is sign up!</p>
					{			!sigUpFormStatus &&		(
						<div className="text-center">
							<button type="button" onClick={() => setSigUpFormStatus(true)} className="btn btn-primary btn-lg">Register</button>
							<button type="button" className="btn btn-info btn-lg ml-2">Learn more</button>
						</div>
					)}
				</div>

				{sigUpFormStatus &&	(
					<div className="container">
						<div className="row justify-content-center">
							<div className="col-4">
								<form>
									<h2 className="text-center text-primary">Sign Up</h2>
									<hr />

									<div className="form-group">
										<input onChange={handleUserDetails} name="username" required type="text" className="form-control" placeholder="Username" />
									</div>

									<div className="form-group">
										<input onChange={handleUserDetails} name="password" required type="password" className="form-control" placeholder="Password" />
									</div>
									{ responseMessage && <div className={`alert alert-${responseStatus === 201 ? 'success' : 'danger'}`} role="alert">{responseMessage}</div>}

									<div className="form-group text-center">
										<button onClick={handleSignup} className="btn btn-success mr-2" type="button">Register</button>
										<button onClick={() => setSigUpFormStatus(false)} className="btn btn-default" type="button">Cancel</button>
									</div>
								</form>

							</div>
						</div>
					</div>
				)}
			</div>
			<Toaster>{responseMessage}</Toaster>
		</div>
	);
}


export default (CSSModules(Home, styles));
