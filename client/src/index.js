import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { APIContextProvider } from './context/apiContext';
import { ToastContextProvider } from './context/ToasContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<APIContextProvider>
		<ToastContextProvider>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</ToastContextProvider>
	</APIContextProvider>
);
