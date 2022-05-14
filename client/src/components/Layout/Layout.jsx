import { NavLink, Outlet } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import './Layout.scss';
import {
	CONTACTS_ROUTE,
	PRODUCTS_ROUTE,
	HOME_ROUTE,
	ADMIN_ROUTE,
} from '../../utils/consts';
import { useContext, useState, useEffect } from 'react';
import { Context } from '../..';
import AuthStatus from '../AuthStatus';
import { BiShoppingBag } from 'react-icons/bi';
import CartModal from '../modals/CartModal';
import { storage } from '../../store/BasketStore';

const Layout = observer(() => {
	const { user, cart } = useContext(Context);
	const [showCart, setShowCart] = useState(false);

	useEffect(() => {
		// basketService.getBasket().then((data) => products.setBaskets(data));
		cart.setItems(storage.getCart());
	}, []);
	return (
		<div className='online__store'>
			<header className='navbar'>
				<nav className='navbar__navigate'>
					<NavLink to={HOME_ROUTE}>Home</NavLink>
					<NavLink to={PRODUCTS_ROUTE}>Products</NavLink>
					<NavLink to={CONTACTS_ROUTE}>Contacts</NavLink>
					{user.isAdmin && <NavLink to={ADMIN_ROUTE}>Admin panel</NavLink>}
					{cart.items.length > 0 && (
						<div className='navbar__navigate__shop'>
							<BiShoppingBag
								onClick={() => setShowCart(true)}
								style={{ width: '25px', height: '100%' }}
							/>
							<span>{cart.items.length}</span>
						</div>
					)}
				</nav>
				<nav className='navbar__login'>
					{user.isAuth ? (
						<>
							<AuthStatus user={user} />
						</>
					) : (
						<>
							<AuthStatus user={user} />
						</>
					)}
				</nav>
				<CartModal show={showCart} onHide={() => setShowCart(false)} />
			</header>

			<main className='container'>
				<Outlet />
			</main>

			<footer className='footer'>
				<p>Stikers online store footer 2022 on React App</p>
			</footer>
		</div>
	);
});

export default Layout;
