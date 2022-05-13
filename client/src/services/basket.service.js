import { $authHost, $host } from '../http';

class BasketDataService {
	async addToBasket(id) {
		const { responce } = await $authHost.post('api/basket', id);
		return responce;
	}

	async getBasket() {
		const { data } = await $authHost.get('api/basket');
		return data;
	}
}

export default new BasketDataService();
