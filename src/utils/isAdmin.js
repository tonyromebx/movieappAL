import jwtDecode from 'jwt-decode';

const isAdmin = (token) => {
	try {
		const decodedToken = jwtDecode(token);
		const isAdminRole = decodedToken.isAdminRole;
		return isAdminRole;
	} catch (error) {
		return false;
	}
};

export default isAdmin;
