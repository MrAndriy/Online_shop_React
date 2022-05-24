import { useState, useEffect } from 'react';
import basketService from '../services/basket.service';
import { OrderList } from '../components/OrderList';
import { useAPI } from '../context/apiContext';

const OrdersPage = () => {
	const [orders, setOrders] = useState([]);
	const { isAdmin } = useAPI();

	useEffect(() => {
		try {
			isAdmin
				? basketService.getAllOreders().then(({ data }) => setOrders(data))
				: basketService.getOrders().then(({ data }) => setOrders(data));
		} catch (e) {}
	}, [isAdmin]);

	return <OrderList orders={orders} />;
};

export default OrdersPage;
