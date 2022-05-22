import { makeAutoObservable } from 'mobx';

export default class Basket {
	constructor() {
		this._items = [];
		makeAutoObservable(this);
	}

	get items() {
		return this._items;
	}

	setItems(item) {
		this._items = item;
	}

	containsItem(id) {
		if (this._items === undefined) {
			return false;
		}
		return this._items.filter((item) => item.id === id).length > 0;
	}

	addToBasket = (product) => {
		if (this.containsItem(product.id)) {
			let updProd = this._items.map((item) => {
				if (item.id === product.id) {
					item.count += 1;
					item.total = item.price * item.count;
				}
				return item;
			});
			this.setItems(updProd);
			storage.saveCart(this._items);
		} else {
			const addProd = [
				{ count: 1, total: product.price, ...product },
				...this._items,
			];
			this.setItems(addProd);
			storage.saveCart(this._items);
		}
	};

	clearItems() {
		this._items = [];
		storage.clearCart();
	}

	minus(product) {
		if (this.containsItem(product.id)) {
			let updProd = this._items.map((item) => {
				if (item.id === product.id) {
					if (item.count === 1) {
						item.count = 1;
					} else {
						item.count -= 1;
						item.total = item.price * item.count;
					}
				}
				return item;
			});
			this.setItems(updProd);
			storage.saveCart(this._items);
		}
	}

	plus(product) {
		if (this.containsItem(product.id)) {
			let updProd = this._items.map((item) => {
				if (item.id === product.id) {
					item.count += 1;
					item.total = item.price * item.count;
				}
				return item;
			});
			this.setItems(updProd);
			storage.saveCart(this._items);
		}
	}

	delete(product) {
		let newCart = this._items.filter((prod) => prod.id !== product.id);
		this.setItems(newCart);
		storage.saveCart(this._items);
	}
}

let cartId = 'cart';

const localAdapter = {
	saveCart: function (object) {
		var stringified = JSON.stringify(object);
		localStorage.setItem(cartId, stringified);
		return true;
	},
	getCart: function () {
		return JSON.parse(localStorage.getItem(cartId)) || [];
	},
	clearCart: function () {
		localStorage.removeItem(cartId);
	},
};

export const storage = localAdapter;
