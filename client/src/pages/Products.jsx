import { useContext } from 'react';
import { Context } from '../index';
import { Row, Col, Card, Spinner } from 'react-bootstrap';
import { BiShoppingBag } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS_ROUTE } from '../utils/consts';

const Products = () => {
	const navigate = useNavigate();
	const { products } = useContext(Context);

	return !!products.products.length ? (
		<Row xs={2} md={4} className='g-4'>
			{products.products.map((product) => (
				<Col key={product._id}>
					<Card
						onClick={() => navigate(`${PRODUCTS_ROUTE}/${product._id}`)}
						style={{ maxHeight: 450, cursor: 'pointer' }}
					>
						<Card.Img
							variant='top'
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
									overflow: 'hidden',
									whiteSpace: 'nowrap',
									textOverflow: 'ellipsis',
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
