import { useNavigate, useLocation } from 'react-router-dom';

const LoginPage = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const handleSubmit = (event) => {
		event.preventDefault();
		const form = event.target;
		const user = form.username.value;
		console.log(user);
	};

	const fromPage = location.state?.from?.pathname || '/';
	return (
		<div>
			<h1>Login page</h1>
			<form onSubmit={handleSubmit}>
				<label>
					Name:
					<input type='text' name='username' />
				</label>
				<button type='submit'>Login</button>
			</form>
		</div>
	);
};

export default LoginPage;
