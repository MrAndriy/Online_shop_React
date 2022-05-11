import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CreateProduct from '../components/modals/CreateProduct';
import EditProduct from '../components/modals/EditProduct';
import productsService from '../services/products.service';
import { Button } from 'react-bootstrap';

const AdminPage = () => {
	const [products, setProducts] = useState([]);
	const [currentProduct, setCurrentProduct] = useState(null);
	const [currentIndex, setCurrentIndex] = useState(-1);
	const [inputSearch, setInputSearch] = useState('');
	const [productModalVisible, setProductModalVisible] = useState(false);
	const [editProductModalVisible, setEditProductModalVisible] = useState(false);

	const onChangeSearchTitle = (e) => {
		const searchTitle = e.target.value;
		setInputSearch(searchTitle);
	};

	const retrieveTutorials = () => {
		productsService
			.getAll()
			.then((response) => {
				setProducts(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const refreshList = () => {
		retrieveTutorials();
		setCurrentProduct(null);
		setCurrentIndex(-1);
	};

	const setActiveTutorial = (tutorial, index) => {
		setCurrentProduct(tutorial);
		setCurrentIndex(index);
	};

	const removeAllTutorials = () => {
		productsService
			.deleteAll()
			.then((response) => {
				console.log(response.data);
				refreshList();
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const searchTitlee = () => {
		productsService
			.findByTitle(inputSearch)
			.then((response) => {
				setProducts(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
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
						products.map((product, index) => (
							<li
								className={
									'list-group-item ' + (index === currentIndex ? 'active' : '')
								}
								onClick={() => setActiveTutorial(product, index)}
								key={index}
							>
								{product.title}
							</li>
						))}
				</ul>
				<button
					className='m-3 btn btn-sm btn-danger'
					onClick={removeAllTutorials}
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
							product={currentProduct}
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
