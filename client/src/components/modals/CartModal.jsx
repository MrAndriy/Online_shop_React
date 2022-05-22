import { useState, useContext, useEffect } from 'react';
import { Modal, Form, Row, Col, Button } from 'react-bootstrap';
import { Context } from '../../App';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import basketService from '../../services/basket.service';
import { storage } from '../../store/BasketStore';
import { useToastContext } from '../../hook/message.hook';

const CartModal = ({ show, onHide, user }) => {
	const { cart } = useContext(Context);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const addToast = useToastContext();

	useEffect(() => {
		cart.setItems(storage.getCart());
	}, [cart]);

	let prices = 0;
	cart.items.map((price) => (prices += Number(price.total)));

	const clearCart = () => {
		setName('');
		setEmail('');
		cart.clearItems();
		onHide(true);
	};

	const sendOrder = () => {
		const userName = name;
		const userEmail = email;

		const formData = {
			cartItems: cart.items,
		};
		if (!user) {
			formData.customer = {
				name: userName,
				email: userEmail,
			};
			basketService
				.makeOrderNotAuth(formData)
				.then(({ data }) => {
					clearCart();
					alert(`Your order #${data._id} confirmed`);
				})
				.catch((e) => console.log(e));
		} else {
			basketService
				.makeOrderAuth(formData)
				.then(({ data }) => {
					clearCart();
					addToast(`Your order #${data._id} confirmed`);
				})
				.catch((e) => console.log(e));
		}
	};

	return (
		<Modal show={show} onHide={onHide} size='lg'>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>Cart</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{cart.items.map((product) => (
					<div key={product.id}>
						<li
							style={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'space-between',
							}}
						>
							<img
								src={process.env.REACT_APP_API_URL + product.image}
								width={50}
								alt={product.title}
							/>
							<div className='col-5'>
								<h5>{product.title}</h5>
								<h6>{product.price} UAH</h6>
							</div>
							<div className='col-3'>
								<AiOutlineMinus onClick={() => cart.minus(product)} />
								<span className='mx-2'>{product.count}</span>
								<AiOutlinePlus onClick={() => cart.plus(product)} />
							</div>
							<div className='col-1'>
								<TiDeleteOutline
									onClick={() => cart.delete(product)}
									style={{ width: '20px', height: '20px' }}
								/>
							</div>
						</li>
						<hr />
					</div>
				))}
				<h2>Total {prices} UAH</h2>

				{user === null && (
					<>
						<hr />
						<Form.Group as={Row} className='mb-3'>
							<Form.Label column sm='3'>
								ваше ім`я
							</Form.Label>
							<Col sm='9'>
								<Form.Control
									name='name'
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</Col>
						</Form.Group>
						<Form.Group as={Row} className='mb-3'>
							<Form.Label column sm='3'>
								ваш емейл
							</Form.Label>
							<Col sm='9'>
								<Form.Control
									name='email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</Col>
						</Form.Group>
					</>
				)}
			</Modal.Body>
			<Modal.Footer>
				<Button variant='outline-danger' onClick={onHide}>
					Закрити
				</Button>
				<Button onClick={() => sendOrder()} variant='outline-success'>
					Замовити
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default CartModal;
