import { useState, useEffect, useContext } from 'react';
import basketService from '../services/basket.service';
import { OrderList } from '../components/OrderList';
import { Context } from '../App';
import { useIsAdmin } from '../hook/isAdmin.hook';

const OrdersPage = () => {
	const [orders, setOrders] = useState([]);
	const { token } = useContext(Context);
	const isAdmin = useIsAdmin(token);

	useEffect(() => {
		try {
			isAdmin
				? basketService.getAllOreders().then(({ data }) => setOrders(data))
				: basketService.getOrders().then(({ data }) => setOrders(data));
		} catch (e) {}
	}, []);

	return <OrderList orders={orders} />;
};

export default OrdersPage;
