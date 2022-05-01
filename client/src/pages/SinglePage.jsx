import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const SinglePage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [product, setProduct] = useState(null);

	const goBack = () => navigate(-1);
	// const goHome = () => navigate('/', { replace: true });

	useEffect(() => {
		axios.get(`http://localhost:3002/api/products/${id}`).then(({ data }) => {
			setProduct(data);
		});
	}, [id]);
	return (
		<div>
			{product && (
				<>
					<h1>{product.title}</h1>
					<p>{product.description}</p>
					<img
						src={`http://localhost:3002/${product.image}`}
						alt={product.title}
					/>
					<button> buy {product.price}</button>
					<button onClick={goBack}>go back</button>
				</>
			)}
		</div>
	);
};

export default SinglePage;
