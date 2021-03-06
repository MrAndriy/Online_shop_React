import { useState } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { Container, Card, Form, Row, Button } from 'react-bootstrap';
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../consts/consts';
import { login, registration } from '../http/userAPI';
import { useToastContext } from '../hook/useToastContext';
import { useAPI } from '../context/apiContext';

const Auth = () => {
	const initStateForm = {
		email: '',
		password: '',
		fullname: '',
	};
	const auth = useAPI();
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
				addToast(`Welcome to Stickerz Shop`);
			} else {
				data = await registration({ ...form });
				auth.login(data);
				addToast(`Registration is success  in Stickerz Shop`);
			}
			navigate(HOME_ROUTE);
		} catch (e) {
			addToast(e.response.data.message);
		}
	};

	return (
		<Container className='d-flex justify-content-center align-items-center'>
			<Card style={{ width: 600 }} className='p-5'>
				<h2 className='m-auto'>{isLogin ? '??????????????????????' : '????????????????????'}</h2>
				<Form className='d-flex flex-column'>
					{!isLogin && (
						<>
							<Form.Control
								className='mt-3'
								placeholder='?????????????? ?????? ???? ????????????????'
								value={form.fullname}
								name='fullname'
								onChange={changeHandler}
							/>
							<p style={{ color: 'red' }}>{formErrors.fullname}</p>
						</>
					)}
					<Form.Control
						className='mt-3'
						placeholder='?????????????? ?????? email...'
						value={form.email}
						name='email'
						onChange={changeHandler}
					/>
					<p style={{ color: 'red' }}>{formErrors.email}</p>
					<Form.Control
						className='mt-3'
						placeholder='?????????????? ?????? ????????????...'
						value={form.password}
						type='password'
						name='password'
						onChange={changeHandler}
					/>
					<p style={{ color: 'red' }}>{formErrors.password}</p>
					<Row className='d-flex justify-content-between mt-3 pl-3 pr-3'>
						{isLogin ? (
							<div>
								?????????? ???????????????{' '}
								<NavLink to={REGISTRATION_ROUTE}>????????????????????????!</NavLink>
							</div>
						) : (
							<div>
								?? ??????????????? <NavLink to={LOGIN_ROUTE}>??????????????!</NavLink>
							</div>
						)}
						<Button variant={'outline-success'} onClick={authorization}>
							{isLogin ? '????????????' : '????????????????????'}
						</Button>
					</Row>
				</Form>
			</Card>
		</Container>
	);
};

export default Auth;
