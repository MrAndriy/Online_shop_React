import { $authHost, $host } from '../http';

class BasketDataService {
	async makeOrder(order) {
		const responce = await $host.post('api/orders', order);
		return responce;
	}

	async getOrders() {
		const { data } = await $authHost.get('api/orders');
		return data;
	}
}

export default new BasketDataService();
