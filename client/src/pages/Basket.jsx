import React, { useEffect } from 'react';
import { useContext } from 'react';
import { Context } from '..';

import { Card, Col, Container, Row } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import basketService from '../services/basket.service';
import { storage } from '../store/BasketStore';

const Basket = observer(() => {
	const { products, cart } = useContext(Context);

	useEffect(() => {
		// basketService.getBasket().then((data) => products.setBaskets(data)); //?
		cart.setItems(storage.getCart());
	}, []);

	let prices = 0;

	cart.items.map((price) => (prices += Number(price.price)));
	
	return (
		<Container className='d-flex flex-sm-column justify-content-center align-items-center mt-3'>
			<h1 className='pb-2'>Корзина</h1>

			<Card className='d-flex flex-row  p-2 justify-content-between align-items-center mb-2'>
				<div>
					<h1 className='pr-2'>Всього:</h1>
					<h3 className='pl-2'>
						{prices}
						<span className='font-weight-light pl-2'>UAH</span>
					</h3>
				</div>
			</Card>

			{cart.items.map((product) => (
				<Card
					className='d-flex w-100 p-2 justify-content-center mb-2'
					key={product.id}
				>
					<Row className='d-flex w-100'>
						<Col>
							<div className='d-flex flex-row align-items-center'>
								<img
									src={process.env.REACT_APP_API_URL + product.image}
									width={50}
								/>
								<h1 className='pl-3'>{product.title}</h1>
							</div>
						</Col>
						<Col>
							<div className='d-flex h-100 flex-row justify-content-between align-items-center'>
								<h2>{product.count} </h2>
								<h2 className='font-weight-light'> ціна {product.total} UAH</h2>
							</div>
						</Col>
					</Row>
				</Card>
			))}
		</Container>
	);
});

export default Basket;
