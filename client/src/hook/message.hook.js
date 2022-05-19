import { useContext } from 'react';
import ToastContext from '../context/ToasContext';

export const useToastContext = () => {
	return useContext(ToastContext);
};
