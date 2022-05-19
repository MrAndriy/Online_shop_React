import React from 'react';
import { Link } from 'react-router-dom';

export const OrderList = ({ orders }) => {
	if (!orders.length) {
		return <p className='center'>Not Orders</p>;
	}

	return (
		<table>
			<thead>
				<tr>
					<th>№</th>
					<th>Cart Items</th>
					<th>Link</th>
				</tr>
			</thead>

			<tbody>
				{orders.map((order, index) => {
					return (
						<tr key={order._id}>
							<td>{index + 1}</td>
							<td>{order.length}</td>
							<td>
								<Link to={`/one/${order._id}`}>Open</Link>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};
