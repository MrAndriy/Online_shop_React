import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../App';
import Slides from '../components/Slides';
import productsService from '../services/products.service';

const Home = observer(() => {
	const { products } = useContext(Context);

	useEffect(() => {
		// set product to context
		productsService.getAll().then(({ data }) => {
			products.setProducts(data);
		});
	}, [products]);

	return (
		<div>
			<Slides
				products={products.products}
				homeSlides={true}
				isNavigated={true}
			/>
		</div>
	);
});

export default Home;
