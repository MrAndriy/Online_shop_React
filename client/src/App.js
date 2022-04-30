import './App.scss';
import { Route, Routes, Navigate } from 'react-router-dom';

//pages
import Home from './pages/Home';
import Contacts from './pages/Contacts';
import Products from './pages/Products';
import SinglePage from './pages/SinglePage';
import NotFound from './pages/NotFound';
import LoginPage from './pages/LoginPage';

//base layout
import { Layout } from './components/index';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<Home />} />
				<Route path='products' element={<Products />} />
				<Route path='products/:id' element={<SinglePage />} />
				<Route path='contacts' element={<Contacts />} />
				<Route
					path='contacts-us'
					element={<Navigate to='/contacts' replace />}
				/>
				<Route path='login' element={<LoginPage />} />
				<Route path='*' element={<NotFound />} />
			</Route>
		</Routes>
	);
}

export default App;
