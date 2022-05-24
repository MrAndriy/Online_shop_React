import React, {
	useContext,
	useState,
	useCallback,
	useEffect,
	createContext,
} from 'react';
import jwt_decode from 'jwt-decode';
import productsService from '../services/products.service';
import Basket from '../store/BasketStore';

const APIContext = createContext();

export function APIContextProvider({ children }) {
	const [products, setProducts] = useState([]);
	const [token, setToken] = useState(null);
	const [userId, setUserId] = useState(null);
	const [ready, setReady] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [user, setUser] = useState(null);

	useEffect(() => {
		async function fetchData() {
			const { data } = await productsService.getAll();
			setProducts(data);
		}
		fetchData();
	}, []);

	const login = useCallback((jwtToken) => {
		const user = jwt_decode(jwtToken);
		setToken(jwtToken);
		setUserId(user.id);
		setIsAuthenticated(true);
		setUser(user);
		if (user.role === 'ADMIN') {
			setIsAdmin(true);
		}

		localStorage.setItem(
			'userData',
			JSON.stringify({
				userId: user.id,
				token: jwtToken,
			})
		);
	}, []);

	const logout = useCallback(() => {
		setToken(null);
		setUserId(null);
		setUser(null);
		setIsAuthenticated(false);
		setIsAdmin(false);

		localStorage.removeItem('userData');
	}, []);

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem('userData'));

		if (data && data.token) {
			login(data.token, data.userId);
		}
		setReady(true);
	}, [login]);

	return (
		<APIContext.Provider
			value={{
				products,
				token,
				userId,
				ready,
				isAuthenticated,
				isAdmin,
				user,
				login,
				logout,
				cart: new Basket(),
			}}
		>
			{children}
		</APIContext.Provider>
	);
}

export function useAPI() {
	const context = useContext(APIContext);
	if (context === undefined) {
		throw new Error('Context must be used within a Provider');
	}
	return context;
}
