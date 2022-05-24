import { BrowserRouter } from 'react-router-dom';
import { Router } from './routes/Router';
import NavBar from './components/Navbar/Navbar';
import { Spinner } from 'react-bootstrap';
import { useAPI } from './context/apiContext';

const App = () => {
	const { ready } = useAPI();

	if (!ready) {
		return (
			<Spinner animation='border' role='status'>
				<span className='visually-hidden'>Loading...</span>
			</Spinner>
		);
	}

	return (
		<BrowserRouter>
			<NavBar />
			<div className='container'>{<Router />}</div>
		</BrowserRouter>
	);
};

export default App;
