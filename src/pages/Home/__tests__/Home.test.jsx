import { Home } from '../Home';

describe('Home', () => {
	it('should render', () => {
		expect(<Home dealer={{ dealerId: 123 }} changeDealerId={() => {}} />).toMatchSnapshot();
	});
});
