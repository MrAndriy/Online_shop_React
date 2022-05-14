import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import UserStore from './store/UserStore';
import ProductStore from './store/ProductStore';
import Basket from './store/BasketStore';

export const Context = createContext(null);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Context.Provider
		value={{
			cart: new Basket(),
			user: new UserStore(),
			products: new ProductStore(),
		}}
	>
		<React.StrictMode>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</React.StrictMode>
	</Context.Provider>
);
