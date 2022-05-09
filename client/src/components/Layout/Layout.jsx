import { NavLink, Outlet } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import './Layout.scss';
import { CONTACTS_ROUTE, PRODUCTS_ROUTE, HOME_ROUTE } from '../../utils/consts';
import { useContext } from 'react';
import { Context } from '../..';
import AuthStatus from '../AuthStatus';

const Layout = observer(() => {
	const { user } = useContext(Context);
	return (
		<div className='online__store'>
			<header className='navbar'>
				<nav className='navbar__navigate'>
					<NavLink to={HOME_ROUTE}>Home</NavLink>
					<NavLink to={PRODUCTS_ROUTE}>Products</NavLink>
					<NavLink to={CONTACTS_ROUTE}>Contacts</NavLink>
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
