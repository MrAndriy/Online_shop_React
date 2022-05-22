import { useState, useCallback, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

const storageName = 'userData';

export const useAuth = () => {
	const [token, setToken] = useState(null);
	const [ready, setReady] = useState(false);
	const [userId, setUserId] = useState(null);

	const login = useCallback((jwtToken) => {
		setToken(jwtToken);
		const user = jwt_decode(jwtToken);
		setUserId(user.id);

		localStorage.setItem(
			storageName,
			JSON.stringify({
				userId: user.id,
				token: jwtToken,
			})
		);
	}, []);

	const logout = useCallback(() => {
		setToken(null);
		setUserId(null);
		localStorage.removeItem(storageName);
	}, []);

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem(storageName));

		if (data && data.token) {
			login(data.token, data.userId);
		}
		setReady(true);
	}, [login]);

	return { login, logout, token, userId, ready };
};
