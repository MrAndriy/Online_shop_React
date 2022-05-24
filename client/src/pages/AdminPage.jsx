import React, { useState } from 'react';
import CreateProduct from '../components/modals/CreateProduct';
import EditProduct from '../components/modals/EditProduct';
import productsService from '../services/products.service';
import { Button } from 'react-bootstrap';

const AdminPage = () => {
	const [products, setProducts] = useState([]);
	const [currentProduct, setCurrentProduct] = useState(null);
	const [currentId, setCurrentId] = useState(-1);
	const [inputSearch, setInputSearch] = useState('');
	const [productModalVisible, setProductModalVisible] = useState(false);
	const [editProductModalVisible, setEditProductModalVisible] = useState(false);

	const onChangeSearchTitle = (e) => {
		const searchTitle = e.target.value;
		setInputSearch(searchTitle);
	};

	const retrieveProducts = () => {
		productsService
			.getAll()
			.then((response) => {
				setProducts(response.data);
			})
			.catch((e) => {});
	};

	const refreshList = () => {
		retrieveProducts();
		setCurrentProduct(null);
		setCurrentId(-1);
	};

	const setActiveProduct = (product, id) => {
		setCurrentProduct(product);
		setCurrentId(id);
	};

	const removeAllProducts = () => {
		productsService
			.deleteAll()
			.then((response) => {
				refreshList();
			})
			.catch((e) => {});
	};

	const searchTitlee = () => {
		productsService
			.findByTitle(inputSearch)
			.then((response) => {
				setProducts(response.data);
			})
			.catch((e) => {});
	};

	return (
		<div className='list row'>
			<div className='col-md-9'>
				<div className='input-group mb-3'>
					<input
						type='text'
						className='form-control'
						placeholder='Search by title'
						value={inputSearch}
						onChange={onChangeSearchTitle}
					/>
					<div className='input-group-append'>
						<button
							className='btn btn-outline-secondary'
							type='button'
							onClick={searchTitlee}
						>
							Search
						</button>
					</div>
					<button
						onClick={() => setProductModalVisible(true)}
						className='btn btn-outline-success mx-2'
						type='button'
					>
						Add
					</button>
				</div>
			</div>
			<div className='col-md-6'>
				<h4>Products List</h4>
				<ul className='list-group'>
					{products &&
						products.map((product) => (
							<li
								className={
									'list-group-item ' +
									(product.id === currentId ? 'active' : '')
								}
								onClick={() => setActiveProduct(product, product.id)}
								key={product.id}
							>
								{product.title}
							</li>
						))}
				</ul>
				<button
					className='m-3 btn btn-sm btn-danger'
					onClick={removeAllProducts}
				>
					Remove All
				</button>
			</div>
			<div className='col-md-6'>
				{currentProduct ? (
					<div>
						<h4>Product</h4>
						<div>
							<label>
								<strong>Title:</strong>
							</label>{' '}
							{currentProduct.title}
						</div>
						<div>
							<img
								style={{ border: '1px solid gray' }}
								height={300}
								width={'100%'}
								src={`${process.env.REACT_APP_API_URL}${currentProduct.image}`}
								alt={currentProduct.title}
							/>
						</div>
						<div>
							<label>
								<strong>Description:</strong>
							</label>{' '}
							{currentProduct.description}
						</div>
						<div>
							<label>
								<strong>Price:</strong>
							</label>{' '}
							{currentProduct.price}
						</div>
						<Button
							onClick={() => setEditProductModalVisible(true)}
							size='sm'
							variant='outline-warning'
						>
							Edit
						</Button>{' '}
						<EditProduct
							refreshList={refreshList}
							show={editProductModalVisible}
							onHide={() => setEditProductModalVisible(false)}
							id={currentId}
						/>
					</div>
				) : (
					<div>
						<br />
						<p>Please click on a Product...</p>
					</div>
				)}
			</div>
			<CreateProduct
				refreshList={refreshList}
				show={productModalVisible}
				onHide={() => setProductModalVisible(false)}
			/>
		</div>
	);
};

export default AdminPage;
