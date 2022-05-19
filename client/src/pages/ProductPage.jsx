import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { BiShoppingBag } from 'react-icons/bi';
import { Context } from '../App';
import productsService from '../services/products.service';

const ProductPage = () => {
	const { cart } = useContext(Context);
	const { id } = useParams();
	const navigate = useNavigate();
	const [product, setProduct] = useState(null);

	const goBack = () => navigate(-1);

	useEffect(() => {
		productsService.get(id).then(({ data }) => setProduct(data));
	}, [id]);

	return (
		<div>
			{product && (
				<Card>
					<Card.Header className='text-center'>{product.title}</Card.Header>
					<Card.Img
						className='w-25 p-3 align-self-center'
						src={`${process.env.REACT_APP_API_URL}${product.image}`}
						alt={product.title}
					/>
					<Card.Body style={{ maxHeight: '250px' }}>
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
							onClick={() => cart.addToBasket(product)}
						/>
					</Card.Footer>
				</Card>
			)}
		</div>
	);
};

export default ProductPage;
