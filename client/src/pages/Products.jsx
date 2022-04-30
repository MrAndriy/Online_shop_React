import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Products = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		axios.get('http://localhost:3001/products').then(({ data }) => {
			setProducts(data);
		});
	}, []);

	return (
		<div>
			{products.length ? (
				products.map((item) => (
					<div className='products__item' key={item.id}>
						<img src={item.additionalImages} alt={item.description} />
						<div className='products__items-wraper'>
							<h2>{item.title}</h2>
							<p>{item.description}</p>
							<button>
								<Link to={`/products/${item.id}`}>More</Link>
							</button>
							<button className='buy'>Buy {item.price}</button>
						</div>
					</div>
				))
			) : (
				<h1>loading data</h1>
			)}
		</div>
	);
};

export default Products;
