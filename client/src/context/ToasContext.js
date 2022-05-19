import React, { useCallback, useEffect, useState, createContext } from 'react';
import { ToastContainer, Toast } from 'react-bootstrap';

const ToastContext = createContext();

export default ToastContext;

export function ToastContextProvider({ children }) {
	const [toasts, setToasts] = useState([]);

	useEffect(() => {
		if (toasts.length > 0) {
			const timer = setTimeout(() => {
				setToasts((toasts) => toasts.slice(1));
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [toasts]);

	const addToasts = useCallback(
		(toast) => {
			setToasts((toasts) => [...toasts, toast]);
		},
		[setToasts]
	);

	return (
		<ToastContext.Provider value={addToasts}>
			{children}
			<ToastContainer position='top-end' className='p-3 mt-5'>
				{toasts.map((toast) => (
					<Toast key={toast}>
						<Toast.Header closeButton={false}>
							<strong className='me-auto'>Stickerz Shop</strong>
							<small className='text-muted'>just now</small>
						</Toast.Header>
						<Toast.Body>{toast}</Toast.Body>
					</Toast>
				))}
			</ToastContainer>
		</ToastContext.Provider>
	);
}
