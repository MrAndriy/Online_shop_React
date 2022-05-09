import { useContext, useState } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Container, Card, Form, Row, Button } from 'react-bootstrap';
import { Context } from '../index';
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import { login, registration } from '../http/userAPI';

const Auth = observer(() => {
	const navigate = useNavigate();
	const location = useLocation();
	const fromPage = location.state?.from?.pathname || '/';

	const { user } = useContext(Context);
	const isLogin = location.pathname === LOGIN_ROUTE;

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const click = async () => {
		try {
			let data;
			if (isLogin) {
				data = await login(email, password);
			} else {
				data = await registration(email, password);
			}
			user.setUser(data);
			user.setIsAuth(true);
			navigate(HOME_ROUTE);
		} catch (e) {
			alert(e.response.data.message);
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
					<Form.Control
						className='mt-3'
						placeholder='Введіть ваш email...'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Form.Control
						className='mt-3'
						placeholder='Введіть ваш пароль...'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type='password'
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
