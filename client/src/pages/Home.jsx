import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { fetchDevices } from '../http/productAPI';
import Slides from '../components/Slides';

const Home = observer(() => {
	const { products } = useContext(Context);

	useEffect(() => {
		fetchDevices().then((data) => products.setProducts(data));
	}, []);

	return (
		<div>
			<Slides products={products.products} />
		</div>
	);
});

export default Home;
