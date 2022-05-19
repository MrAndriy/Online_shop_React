import jwt_decode from 'jwt-decode';

export const isAdmin = (token) => {
	const decode = token === null ? false : jwt_decode(token).role === 'ADMIN';
	return decode;
};
