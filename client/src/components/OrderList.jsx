import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ORDERS_PAGE_ROUTE } from '../utils/consts';

export const OrderList = ({ orders }) => {
	const navigate = useNavigate();
	if (!orders.length) {
		return <p className='center'>No Orders to show</p>;
	}

	return (
		<Table striped bordered hover>
			<thead>
				<tr>
					<th>№</th>
					<th>Order №</th>
					<th>See more</th>
				</tr>
			</thead>

			<tbody>
				{orders.map((order, index) => {
					return (
						<tr key={order._id}>
							<td>{index + 1}</td>
							<td>{order._id}</td>
							<td>
								<Button
									onClick={() =>
										navigate(`${ORDERS_PAGE_ROUTE}/one/${order._id}`)
									}
									variant='outline-info'
								>
									Open
								</Button>
							</td>
						</tr>
					);
				})}
			</tbody>
		</Table>
	);
};
