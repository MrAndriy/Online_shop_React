import { useNavigate, Link } from 'react-router-dom';
import { HOME_ROUTE, LOGIN_ROUTE } from '../consts/consts';
import { MdLogout } from 'react-icons/md';
import { useAPI } from '../context/apiContext';

const AuthStatus = () => {
	const { logout, isAuthenticated, user } = useAPI();
	let navigate = useNavigate();

	const logOut = () => {
		logout();
		navigate(HOME_ROUTE);
	};

	if (!isAuthenticated) {
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
