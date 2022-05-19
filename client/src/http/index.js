import axios from 'axios';

const $host = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
});

const $authHost = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
});

const userData = JSON.parse(localStorage.getItem('userData'));

const authInterceptor = (config) => {
	config.headers.authorization = `Bearer ${userData.token}`;
	return config;
};

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
