import { useState, useContext } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Container, Card, Form, Row, Button } from 'react-bootstrap';
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import { login, registration } from '../http/userAPI';
import { Context } from '../App';
import { useToastContext } from '../hook/message.hook';
import jwt_decode from 'jwt-decode';

const Auth = observer(() => {
	const initStateForm = {
		email: '',
		password: '',
		fullname: '',
	};

	const auth = useContext(Context);
	const [form, setForm] = useState(initStateForm);
	const navigate = useNavigate();
	const location = useLocation();
	const fromPage = location.state?.from?.pathname || '/'; // need if user not logining and redirect after login
	const isLogin = location.pathname === LOGIN_ROUTE;
	const addToast = useToastContext();

	const changeHandler = (event) => {
		setForm({ ...form, [event.target.name]: event.target.value });
	};

	const click = async () => {
		try {
			let data;
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
		<Container
			className='d-flex justify-content-center align-items-center'
			style={{ height: window.innerHeight - 54 }}
		>
			<Card style={{ width: 600 }} className='p-5'>
				<h2 className='m-auto'>{isLogin ? 'Авторизація' : 'Реєстрація'}</h2>
				<Form className='d-flex flex-column'>
					{!isLogin && (
						<Form.Control
							className='mt-3'
							placeholder='Введіть Імя та Прізвище'
							value={form.fullname}
							name='fullname'
							onChange={changeHandler}
						/>
					)}
					<Form.Control
						className='mt-3'
						placeholder='Введіть ваш email...'
						value={form.email}
						name='email'
						onChange={changeHandler}
					/>
					<Form.Control
						className='mt-3'
						placeholder='Введіть ваш пароль...'
						value={form.password}
						type='password'
						name='password'
						onChange={changeHandler}
					/>
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
						<Button variant={'outline-success'} onClick={click}>
							{isLogin ? 'Увійти' : 'Реєстрація'}
						</Button>
					</Row>
				</Form>
			</Card>
		</Container>
	);
});

export default Auth;
