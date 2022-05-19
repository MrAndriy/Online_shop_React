import { useNavigate, Link } from 'react-router-dom';
import { BASKET_ROUTE, HOME_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import { MdLogout } from 'react-icons/md';
import { useContext } from 'react';
import { Context } from '../App';

const AuthStatus = ({ user }) => {
	const auth = useContext(Context);
	let navigate = useNavigate();

	const logOut = () => {
		auth.logout();
		navigate(HOME_ROUTE);
	};

	if (!auth.isAuthenticated) {
		return (
			<div>
				<p>
					You are not logged in. Please{' '}
					<Link style={{ margin: 0 }} to={LOGIN_ROUTE}>
						Login
					</Link>
				</p>
			</div>
		);
	}

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'row',
				alignSelf: 'center',
			}}
		>
			<p>
				Welcome {user.fullname}!
				<MdLogout
					onClick={() => logOut()}
					style={{ width: '25px', height: '100%', cursor: 'pointer' }}
				/>
			</p>
		</div>
	);
};

export default AuthStatus;
