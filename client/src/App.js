import { createContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './routes/Router';
import ProductStore from './store/ProductStore';
import Basket from './store/BasketStore';
import NavBar from './components/Navbar/Navbar';
import { useAuth } from './hook/useAuth';
import { ToastContextProvider } from './context/ToasContext';
import { Spinner } from 'react-bootstrap';
import { useIsAdmin } from './hook/useIsAdmin';

export const Context = createContext(null);

const App = () => {
	const { token, login, logout, userId, ready } = useAuth();
	const isAuthenticated = !!token;
	const Admin = useIsAdmin(token);
	const routes = Router(isAuthenticated, Admin);

	if (!ready) {
		return (
			<Spinner animation='border' role='status'>
				<span className='visually-hidden'>Loading...</span>
			</Spinner>
		);
	}

	return (
		<Context.Provider
			value={{
				token,
				login,
				logout,
				userId,
				isAuthenticated,
				cart: new Basket(),
				products: new ProductStore(),
			}}
		>
			<ToastContextProvider>
				<BrowserRouter>
					<NavBar isAuthenticated={isAuthenticated} />
					<div className='container'>{routes}</div>;
				</BrowserRouter>
			</ToastContextProvider>
		</Context.Provider>
	);
};

export default App;
