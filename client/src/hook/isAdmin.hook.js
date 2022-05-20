import jwt_decode from 'jwt-decode';

export const useIsAdmin = (token) => {
	const decode = token === null ? false : jwt_decode(token).role === 'ADMIN';
	return decode;
};
