import { Row, Col, Card, Spinner } from 'react-bootstrap';
import { BiShoppingBag } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS_ROUTE } from '../consts/consts';
import { useAPI } from '../context/apiContext';

const Products = () => {
	const navigate = useNavigate();
	const { products, cart } = useAPI();

	return products.length > 0 ? (
		<Row xs={2} md={4} className='g-4'>
			{products.map((product) => (
				<Col key={product.id}>
					<Card style={{ height: 450 }}>
						<Card.Img
							style={{ cursor: 'pointer', height: '200px', padding: '15px' }}
							onClick={() => navigate(`${PRODUCTS_ROUTE}/${product.id}`)}
							src={`${process.env.REACT_APP_API_URL}${product.image}`}
						/>
						<Card.Body>
							<Card.Title
								style={{
									overflow: 'hidden',
									whiteSpace: 'nowrap',
									textOverflow: 'ellipsis',
								}}
							>
								{product.title}
							</Card.Title>
							<Card.Text
								style={{
									height: '100px',
								}}
							>
								{product.description}
							</Card.Text>
						</Card.Body>
						<Card.Footer
							style={{ display: 'flex', justifyContent: 'space-between' }}
						>
							<p>ціна {product.price} UAH</p>
							<BiShoppingBag
								onClick={() => cart.addToBasket(product)}
								style={{
									width: '25px',
									height: '100%',
								}}
							/>
						</Card.Footer>
					</Card>
				</Col>
			))}
		</Row>
	) : (
		<Spinner animation='border' role='status' />
	);
};

export default Products;
