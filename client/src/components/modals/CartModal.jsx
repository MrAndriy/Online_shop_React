import React, { useState, useContext } from 'react';
import { Modal, Form, Row, Col, Button } from 'react-bootstrap';
import { Context } from '../../index';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import basketService from '../../services/basket.service';
import { storage } from '../../store/BasketStore';

const CartModal = ({ show, onHide }) => {
	const { user, cart } = useContext(Context);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');

	let prices = 0;
	cart.items.map((price) => (prices += Number(price.total)));

	const clearCart = () => {
		setName('');
		setEmail('');
		cart.clearItems();
		onHide(true);
	};

	const sendOrder = () => {
		const userId = user.user !== null ? user.user.id : 'unathorizated';
		const userName = user.user !== null ? user.user.email : name;
		const userEmail = user.user !== null ? user.user.email : email;

		const formData = {
			customer: {
				userId: userId,
				name: userName,
				email: userEmail,
			},
			cartItems: cart.items,
		};

		basketService
			.makeOrder(formData)
			.then(({ data }) => {
				clearCart();
				alert(`Your order #${data._id} confirmed`);
			})
			.catch((e) => console.log(e));
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
				{user.user === null ? (
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
				) : (
					<div></div>
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
