import { makeAutoObservable } from 'mobx';

export default class UserStore {
	constructor() {
		this._isAuth = false;
		this._user = null;
		makeAutoObservable(this);
	}

	get isAuth() {
		return this._isAuth;
	}

	get user() {
		return this._user;
	}

	get isAdmin() {
		return this._user != null
			? this._user.role === 'ADMIN'
				? true
				: false
			: false;
	}

	setIsAuth(bool) {
		this._isAuth = bool;
	}

	setUser(user) {
		this._user = user;
	}
}
