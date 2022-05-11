import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, Form, Row, Col } from 'react-bootstrap';
import productsService from '../../services/products.service';

const EditProduct = ({ show, onHide, product, refreshList }) => {
	const [prod, setProd] = useState(product);
	const [file, setFile] = useState(null);

	const selectFile = (e) => {
		setFile(e.target.files[0]);
	};

	const addProduct = () => {
		// if (!!file) {
		// 	setProd((prod) => ({
		// 		...prod,
		// 		'image': file,
		// 	}));
		// }
		productsService.update(prod.id, prod).then((data) => {
			onHide();
			refreshList();
		});
	};

	const deleteProduct = () => {
		productsService
			.delete(prod.id)
			.then(({ data }) => {
				console.log(data);
			})
			.catch((e) => console.log(e));

		onHide();
		refreshList();
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setProd((prod) => ({
			...prod,
			[name]: value,
		}));
	};

	return (
		<Modal show={show} onHide={onHide} centered>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					Edit Products
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group as={Row} className='mb-3'>
						<Form.Label column sm='2'>
							Title
						</Form.Label>
						<Col sm='10'>
							<Form.Control
								name='title'
								value={prod.title}
								onChange={handleChange}
								placeholder='введіть назву продукту'
							/>
						</Col>
					</Form.Group>

					<Form.Group as={Row} className='mb-3'>
						<Form.Label column sm='2'>
							Description
						</Form.Label>
						<Col sm='10'>
							<Form.Control
								name='description'
								value={prod.description}
								onChange={handleChange}
								placeholder='введіть опис продукту'
							/>
						</Col>
					</Form.Group>

					<Form.Group as={Row} className='mb-3'>
						<Form.Label column sm='2'>
							Price
						</Form.Label>
						<Col sm='10'>
							<Form.Control
								name='price'
								value={prod.price}
								onChange={handleChange}
								placeholder='введіть вартість продукту'
								type='number'
							/>
						</Col>
					</Form.Group>

					<Form.Group as={Row} className='mb-3'>
						<Form.Label column sm='2'>
							Image
						</Form.Label>
						<Col sm='10'>
							<img
								src={process.env.REACT_APP_API_URL + prod.image}
								style={{
									maxHeight: '300px',
									width: '100%',
								}}
							/>
						</Col>
					</Form.Group>

					<Form.Control className='mt-3' type='file' onChange={selectFile} />
					<hr />
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button
					onClick={deleteProduct}
					variant='outline-danger'>Видалити</Button>
				<Button variant='outline-danger' onClick={onHide}>
					Закрити
				</Button>
				<Button variant='outline-success' onClick={addProduct}>
					Обновити
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default EditProduct;
