import { Route, Routes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

//pages
import Home from './pages/Home';
import Contacts from './pages/Contacts';
import Products from './pages/Products';
import ProductPage from './pages/ProductPage';
import Auth from './pages/Auth';

//base layout
import { Layout } from './components/index';
import { Spinner } from 'react-bootstrap';
//routes
import {
	ADMIN_ROUTE,
	CONTACTS_ROUTE,
	HOME_ROUTE,
	LOGIN_ROUTE,
	PRODUCTS_ROUTE,
	PRODUCT_PAGE_ROUTE,
	REGISTRATION_ROUTE,
} from './utils/consts';
import { useContext, useEffect, useState } from 'react';
import { Context } from '.';
import { check } from './http/userAPI';
import AdminPage from './pages/AdminPage';
import productsService from './services/products.service';

const App = observer(() => {
	const { user, products } = useContext(Context);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// set product to context
		productsService.getAll().then(({ data }) => {
			products.setProducts(data);
		});

		//check auth
		if (!localStorage.getItem('token')) {
			setLoading(false);
		} else {
			check()
				.then((data) => {
					user.setUser(data);
					user.setIsAuth(true);
				})
				.finally(() => setLoading(false));
		}
	}, []);

	if (loading) {
		return <Spinner className='text-center' animation={'grow'} />;
	}

	return (
		<Routes>
			<Route element={<Layout />}>
				<Route path={HOME_ROUTE} element={<Home />} />
				<Route path={PRODUCTS_ROUTE} element={<Products />} />
				<Route path={PRODUCT_PAGE_ROUTE} element={<ProductPage />} />
				<Route path={CONTACTS_ROUTE} element={<Contacts />} />
				<Route path={LOGIN_ROUTE} element={<Auth />} />
				<Route path={REGISTRATION_ROUTE} element={<Auth />} />
				<Route path={ADMIN_ROUTE} element={<AdminPage />} />
				<Route
					path='*'
					element={
						<main style={{ padding: '1rem' }}>
							<p>There's nothing here! </p>
						</main>
					}
				/>
			</Route>
		</Routes>
	);
});

export default App;
