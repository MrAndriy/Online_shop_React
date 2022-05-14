import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import Slides from '../components/Slides';

const Home = observer(() => {
	const { products } = useContext(Context);

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
