import { $authHost, $host } from './index';

export const fetchDevices = async () => {
	const { data } = await $host.get('api/products/');
	return data;
};

export const fetchOneDevice = async (id) => {
	const { data } = await $host.get(`api/products/${id}`);
	return data;
};

export const createDevice = async (device) => {
	const { data } = await $authHost.post('api/products', device);
	return data;
};
