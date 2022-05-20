import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
//routes
import {
	HOME_ROUTE,
	PRODUCTS_ROUTE,
	PRODUCT_PAGE_ROUTE,
	CONTACTS_ROUTE,
	LOGIN_ROUTE,
	REGISTRATION_ROUTE,
	ADMIN_ROUTE,
	ORDERS_PAGE_ROUTE,
} from '../utils/consts';
//pages
import Auth from '../pages/Auth';
import Home from '../pages/Home';
import Products from '../pages/Products';
import ProductPage from '../pages/ProductPage';
import Contacts from '../pages/Contacts';
import AdminPage from '../pages/AdminPage';
import OrdersPage from '../pages/OrdersPage';
import OrderInfo from '../components/OrderInfo';

export const useRoutes = (isAuthenticated, Admin) => {
	if (isAuthenticated) {
		return (
			<Routes>
				<Route path={HOME_ROUTE} element={<Home />} />
				<Route path={PRODUCTS_ROUTE} element={<Products />} />
				<Route path={PRODUCT_PAGE_ROUTE} element={<ProductPage />} />
				<Route path={CONTACTS_ROUTE} element={<Contacts />} />
				<Route path={LOGIN_ROUTE} element={<Auth />} />
				<Route path={REGISTRATION_ROUTE} element={<Auth />} />
				<Route path={ORDERS_PAGE_ROUTE} element={<OrdersPage />} />
				<Route path={ORDERS_PAGE_ROUTE + '/one/:id'} element={<OrderInfo />} />
				{Admin && <Route path={ADMIN_ROUTE} element={<AdminPage />} />}
				<Route path='*' element={<Navigate to={HOME_ROUTE} replace />} />;
			</Routes>
		);
	}

	return (
		<Routes>
			<Route path={HOME_ROUTE} element={<Home />} />
			<Route path={PRODUCTS_ROUTE} element={<Products />} />
			<Route path={CONTACTS_ROUTE} element={<Contacts />} />
			<Route path={LOGIN_ROUTE} element={<Auth />} />
			<Route path={REGISTRATION_ROUTE} element={<Auth />} />
			<Route path={PRODUCT_PAGE_ROUTE} element={<ProductPage />} />
			<Route path='*' element={<Navigate to={HOME_ROUTE} replace />} />
		</Routes>
	);
};
