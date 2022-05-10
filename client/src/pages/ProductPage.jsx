import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchOneDevice } from '../http/productAPI';
import { Card, Button } from 'react-bootstrap';
import { BiShoppingBag } from 'react-icons/bi';

const ProductPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [product, setProduct] = useState(null);

	const goBack = () => navigate(-1);
	// const goHome = () => navigate('/', { replace: true });

	useEffect(() => {
		fetchOneDevice(id).then((data) => setProduct(data));
	}, [id]);

	return (
		<div>
			{product && (
				<Card>
					<Card.Header className='text-center'>{product.title}</Card.Header>
					<Card.Img
						className='w-25 p-3 align-self-center'
						variant='top'
						src={`${process.env.REACT_APP_API_URL}${product.image}`}
						alt={product.title}
					/>
					<Card.Body>
						<Card.Text>{product.description}</Card.Text>
						<Card.Text> Ціна {product.price} UAH</Card.Text>
					</Card.Body>
					<Card.Footer className='d-flex justify-content-between'>
						<Button onClick={goBack} variant='outline-secondary'>
							Назад
						</Button>
						<BiShoppingBag
							style={{
								width: '25px',
								height: '100%',
							}}
						/>
					</Card.Footer>
				</Card>
			)}
		</div>
	);
};

export default ProductPage;
