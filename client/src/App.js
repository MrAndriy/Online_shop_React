import { createContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useRoutes } from './routes/routes';
import ProductStore from './store/ProductStore';
import Basket from './store/BasketStore';
import NavBar from './components/Navbar/Navbar';
import { useAuth } from './hook/auth.hook';
import { ToastContextProvider } from './context/ToasContext';
import { Spinner } from 'react-bootstrap';
import { isAdmin } from './hook/isAdmin.hook';

export const Context = createContext(null);

const App = () => {
	const { token, login, logout, userId, ready } = useAuth();
	const isAuthenticated = !!token;
	const Admin = isAdmin(token);
	const routes = useRoutes(isAuthenticated, Admin);

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
