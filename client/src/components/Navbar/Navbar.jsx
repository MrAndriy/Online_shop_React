import { NavLink } from 'react-router-dom';
import './Navbar.scss';
import {
	CONTACTS_ROUTE,
	PRODUCTS_ROUTE,
	HOME_ROUTE,
	ADMIN_ROUTE,
	ORDERS_PAGE_ROUTE,
} from '../../consts/consts';
import { useContext, useState } from 'react';
import AuthStatus from '../AuthStatus';
import { BiShoppingBag } from 'react-icons/bi';
import CartModal from '../modals/CartModal';
import { Context } from '../../App';
import { observer } from 'mobx-react-lite';
import jwt_decode from 'jwt-decode';

const NavBar = observer(({ isAuthenticated }) => {
	const { cart, token } = useContext(Context);
	const [showCart, setShowCart] = useState(false);
	const user = isAuthenticated ? jwt_decode(token) : null;
	const isAdmin = isAuthenticated ? user.role === 'ADMIN' : null;

	return (
		<header className='navbar'>
			<nav className='navbar__navigate'>
				<NavLink to={HOME_ROUTE}>Home</NavLink>
				<NavLink to={PRODUCTS_ROUTE}>Products</NavLink>
				<NavLink to={CONTACTS_ROUTE}>Contacts</NavLink>
				{isAuthenticated && (
					<NavLink to={ORDERS_PAGE_ROUTE}>
						{isAdmin ? 'Check orders' : 'My orders'}
					</NavLink>
				)}
				{isAdmin && <NavLink to={ADMIN_ROUTE}>Admin panel</NavLink>}
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
				<AuthStatus user={user} />
			</nav>
			<CartModal
				show={showCart}
				onHide={() => setShowCart(false)}
				user={user}
			/>
		</header>
	);
});

export default NavBar;
