import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import './Layout.scss';

const Layout = () => {
	return (
		<div className='online__store'>
			<header className='navbar'>
				<nav className='navbar__navigate'>
					<NavLink to='/'>Home</NavLink>
					<NavLink to='/products'>Products</NavLink>
					<NavLink to='/contacts'>Contacts</NavLink>
				</nav>
				<nav className='navbar__login'>
					<NavLink to='/login'>Login</NavLink>
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
};

export default Layout;
