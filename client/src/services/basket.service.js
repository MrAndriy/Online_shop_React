import { $authHost, $host } from '../http';

class BasketDataService {
	async makeOrderAuth(order) {
		const responce = await $authHost.post('api/orders', order);
		return responce;
	}

	async makeOrderNotAuth(order) {
		const responce = await $host.post('api/orders', order);
		return responce;
	}

	async getOrders() {
		return await $authHost.get('api/orders');
	}

	async getOneOrder(id) {
		return await $authHost.get(`/api/orders/one/${id}`);
	}

	async getAllOreders() {
		return await $authHost.get('/api/orders/all');
	}
}

export default new BasketDataService();
