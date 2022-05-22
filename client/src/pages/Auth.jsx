import { useState, useContext } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Container, Card, Form, Row, Button } from 'react-bootstrap';
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import { login, registration } from '../http/userAPI';
import { Context } from '../App';
import { useToastContext } from '../hook/useToastContext';
import jwt_decode from 'jwt-decode';

const Auth = observer(() => {
	const initStateForm = {
		email: '',
		password: '',
		fullname: '',
	};
	const auth = useContext(Context);
	const [form, setForm] = useState(initStateForm);
	const [formErrors, setFormErrors] = useState({});
	const navigate = useNavigate();
	const location = useLocation();
	// const fromPage = location.state?.from?.pathname || '/'; // need if user not logining and redirect after login
	const isLogin = location.pathname === LOGIN_ROUTE;
	const addToast = useToastContext();

	const changeHandler = (event) => {
		const { name, value } = event.target;
		setForm({ ...form, [name]: value });
	};

	const validate = (values) => {
		const errors = {};
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
		if (!values.fullname) {
			errors.fullname = 'Fullname is required';
		}
		if (!values.email) {
			errors.email = 'Email is required';
		} else if (!regex.test(values.email)) {
			errors.email = 'Not valid email format';
		}
		if (!values.password) {
			errors.password = 'Password is required';
		} else if (values.password.length < 4) {
			errors.password = 'Password must be more than 4 chanrters';
		} else if (values.password.length > 32) {
			errors.password = 'Password cannot exceed more than 32 chanrters';
		}

		return errors;
	};

	const authorization = async () => {
		try {
			let data;
			setFormErrors(validate(form));
			if (isLogin) {
				data = await login({ ...form });
				auth.login(data);
				let user = jwt_decode(data);
				addToast(`Welcome ${user.fullname} to Stickerz Shop`);
			} else {
				data = await registration({ ...form });
				auth.login(data);
				let user = jwt_decode(data);
				addToast(`Registration is success ${user.fullname} in Stickerz Shop`);
			}
			navigate(HOME_ROUTE);
		} catch (e) {
			addToast(e.response.data.message);
		}
	};

	return (
		<Container className='d-flex justify-content-center align-items-center'>
			<Card style={{ width: 600 }} className='p-5'>
				<h2 className='m-auto'>{isLogin ? 'Авторизація' : 'Реєстрація'}</h2>
				<Form className='d-flex flex-column'>
					{!isLogin && (
						<>
							<Form.Control
								className='mt-3'
								placeholder='Введіть Імя та Прізвище'
								value={form.fullname}
								name='fullname'
								onChange={changeHandler}
							/>
							<p style={{ color: 'red' }}>{formErrors.fullname}</p>
						</>
					)}
					<Form.Control
						className='mt-3'
						placeholder='Введіть ваш email...'
						value={form.email}
						name='email'
						onChange={changeHandler}
					/>
					<p style={{ color: 'red' }}>{formErrors.email}</p>
					<Form.Control
						className='mt-3'
						placeholder='Введіть ваш пароль...'
						value={form.password}
						type='password'
						name='password'
						onChange={changeHandler}
					/>
					<p style={{ color: 'red' }}>{formErrors.password}</p>
					<Row className='d-flex justify-content-between mt-3 pl-3 pr-3'>
						{isLogin ? (
							<div>
								немає акаунта?{' '}
								<NavLink to={REGISTRATION_ROUTE}>Зареєструйся!</NavLink>
							</div>
						) : (
							<div>
								Є аккаунт? <NavLink to={LOGIN_ROUTE}>Уввійди!</NavLink>
							</div>
						)}
						<Button variant={'outline-success'} onClick={authorization}>
							{isLogin ? 'Увійти' : 'Реєстрація'}
						</Button>
					</Row>
				</Form>
			</Card>
		</Container>
	);
});

export default Auth;
