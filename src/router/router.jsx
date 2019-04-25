import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import store, { history } from '../utils/configureStore';
import HomeScreen from '../pages/Home/Home';
import MoviesPage from '../pages/Movies/Movies';
import MoviesDetails from '../pages/MoviesDetails/MoviesDetails';

const AppContainer = (
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Switch>
				<Route exact path="/movies" component={MoviesPage} />
				<Route path="/movies/:id" component={MoviesDetails} />
				<Route component={HomeScreen} />
			</Switch>
		</ConnectedRouter>
	</Provider>
);

export default AppContainer;
