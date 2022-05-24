import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useAPI } from '../context/apiContext';
import { findUser } from '../http/userAPI';
import basketService from '../services/basket.service';

const OrderInfo = () => {
	const { id } = useParams();
	const [order, setOrder] = useState(null);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const { isAdmin } = useAPI();

	const navigate = useNavigate();

	const goBack = () => navigate(-1);

	let totalAll = 0;

	useEffect(() => {
		try {
			async function fetch() {
				const fetchedOreder = await basketService.getOneOrder(id);
				if (isAdmin) {
					let customer = fetchedOreder.data.customer
						? fetchedOreder.data.customer
						: null;
					let owner = customer === null ? fetchedOreder.data.owner : null;
					if (customer) {
						setEmail(customer.email);
						setName(customer.name);
					}
					if (owner) {
						const user = await findUser(owner);
						setEmail(user.email);
						setName(user.fullname);
					}
				}
				setOrder(fetchedOreder.data);
			}

			fetch();
		} catch (e) {}
	}, [id, isAdmin]);

	if (!!order) {
		order.cartItems.map((price) => (totalAll += Number(price.total)));
	}

	return (
		<div>
			{isAdmin && order && (
				<div>
					<h4>Info about customer:</h4>
					<p>Name: {name}</p>
					<p>Email: {email}</p>

					<hr />
				</div>
			)}
			{order &&
				order.cartItems.map((item) => (
					<li
						key={item.id}
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							borderBottom: '1px solid black',
						}}
					>
						<img
							src={process.env.REACT_APP_API_URL + item.image}
							width={50}
							alt={item.title}
						/>
						<div className='col-6'>
							<h5>{item.title}</h5>
							<h6>{item.price} UAH</h6>
						</div>
						<div className='col-2 my-auto'>
							<span>quantity {item.count}</span>
						</div>
						<div className='col-3 text-end my-auto'>
							<span> total {item.total}</span>
						</div>
					</li>
				))}
			<div className='d-flex justify-content-between mt-2'>
				<Button onClick={goBack} variant='outline-secondary'>
					Go back
				</Button>
				<p className='text-end'>Total All {totalAll}</p>
			</div>
		</div>
	);
};

export default OrderInfo;
