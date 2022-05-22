import React from 'react';
import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS_ROUTE, slidesInterval } from '../../consts/consts';

const Slides = ({ products, homeSlides, isNavigated }) => {
	const navigate = useNavigate();

	const navigatePage = (item) => {
		if (isNavigated) {
			navigate(`${PRODUCTS_ROUTE}/${item.id}`);
		}
	};
	return (
		<div className='carousel-offers'>
			<Carousel variant='dark'>
				{homeSlides && (
					<Carousel.Item interval={5000}>
						<div
							onClick={() => navigate(PRODUCTS_ROUTE)}
							style={{
								height: 400,
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								textAlign: 'center',
								padding: '120px',
								cursor: 'pointer',
								marginBottom: 50,
							}}
						>
							<h3>Welcome to Stikerz shop</h3>
							<p>Best Stikerz in world</p>
							<hr />
							<p>Buy with discount today</p>
						</div>
					</Carousel.Item>
				)}
				{products.map((item) => (
					<Carousel.Item
						onClick={() => navigatePage(item)}
						key={item.id}
						interval={slidesInterval}
						style={{ cursor: 'pointer', maxHeight: 500, marginBottom: 50 }}
					>
						<img
							className='d-block mx-auto p-3 rounded-circle'
							style={{ maxHeight: '400px', border: '2px solid black' }}
							src={process.env.REACT_APP_API_URL + item.image}
							alt={item.title}
						/>
					</Carousel.Item>
				))}
			</Carousel>
		</div>
	);
};

export default Slides;
