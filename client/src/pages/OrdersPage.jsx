import { useState, useContext, useEffect } from 'react';
import basketService from '../services/basket.service';
import { Context } from '../App';
import { OrderList } from '../components/OrderList';

const OrdersPage = () => {
	const [orders, setOrders] = useState([]);
	const { token } = useContext(Context);

	useEffect(() => {
		try {
			basketService.getOrders().then(({ data }) => {
				setOrders(data);
			});
		} catch (e) {}
	}, [token]);

	return <OrderList orders={orders} />;
};

export default OrdersPage;
