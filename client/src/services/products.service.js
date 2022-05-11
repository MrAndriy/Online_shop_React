import { $authHost, $host } from '../http';

class ProductsDataService {
	async create(data) {
		return $authHost.post('api/products', data);
	}

	async get(id) {
		return $host.get(`api/products/${id}`);
	}

	async getAll() {
		return $host.get('api/products');
	}

	async update(id, data) {
		return $authHost.put(`api/products/${id}`, data);
	}
	async delete(id) {
		return $authHost.delete(`api/products/${id}`);
	}
	async deleteAll() {
		return $authHost.delete(`api/products/`);
	}
	async findByTitle(title) {
		return $host.get(`api/products/?title=${title}`);
	}
}

export default new ProductsDataService();
