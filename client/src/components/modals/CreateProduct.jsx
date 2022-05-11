import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import productsService from '../../services/products.service';

const CreateProduct = ({ show, onHide, refreshList }) => {
	const [name, setName] = useState('');
	const [price, setPrice] = useState(0);
	const [file, setFile] = useState(null);
	const [description, setDescription] = useState('');

	const selectFile = (e) => {
		setFile(e.target.files[0]);
	};

	const refreshState = () => {
		setName('');
		setPrice(0);
		setFile(null);
		setDescription('');
	};

	const addProduct = () => {
		const formData = new FormData();
		formData.append('title', name);
		formData.append('price', `${price}`);
		formData.append('image', file);
		formData.append('description', description);
		productsService.create(formData).then((data) => {
			onHide();
			refreshList();
			refreshState();
		});
	};

	return (
		<Modal show={show} onHide={onHide} centered>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					додати продукт
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Control
						value={name}
						onChange={(e) => setName(e.target.value)}
						className='mt-3'
						placeholder='введіть назву продукту'
					/>
					<Form.Control
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className='mt-3'
						placeholder='введіть опис продукту'
					/>
					<Form.Control
						value={price}
						onChange={(e) => setPrice(Number(e.target.value))}
						className='mt-3'
						placeholder='введіть вартість продукту'
						type='number'
					/>
					<Form.Control className='mt-3' type='file' onChange={selectFile} />
					<hr />
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='outline-danger' onClick={onHide}>
					Закрити
				</Button>
				<Button variant='outline-success' onClick={addProduct}>
					Додати
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default CreateProduct;
