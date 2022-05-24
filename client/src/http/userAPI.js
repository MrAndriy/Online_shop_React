import { $authHost, $host } from './index';

export const registration = async ({ email, password, fullname }) => {
	try {
		const { data } = await $host.post('api/user/registration', {
			email,
			password,
			fullname,
		});
		return data.token;
	} catch (error) {
		return error;
	}
};

export const login = async ({ email, password }) => {
	try {
		const { data } = await $host.post('api/user/login', { email, password });
		return data.token;
	} catch (error) {
		return error;
	}
};

export const findUser = async (id) => {
	try {
		const { data } = await $authHost.get(`api/user/find/${id}`);
		return data;
	} catch (error) {
		return error;
	}
};
