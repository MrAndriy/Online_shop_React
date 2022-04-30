import React from 'react';
import { Carousel } from 'react-bootstrap';

//svg
import { babyJoda, banana, girl, viking } from '../assets/img/index.jsx';

function Slides({ products }) {
	const images = [babyJoda, banana, girl, viking];
	return (
		<Carousel>
			{products &&
				images.map((item, index) => (
					<Carousel.Item key={index} interval={3000}>
						<img
							className='d-block w-50 h-50'
							src={item}
							alt={`carousel ${index}`}
						/>
					</Carousel.Item>
				))}
		</Carousel>
	);
}

export default Slides;
