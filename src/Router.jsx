import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import Shop from './components/Shop/Shop';
import App from './components/App/App';
import {useState} from 'react';

const Router = () => {
	const [productData, setProductData] = useState(null);

	// Loader for `Shop` -- Get all the products to show
	const getAllProducts = async () => {
		// If data has NOT been loaded
		if (!productData) {
			// Get product data
			const response = await fetch('https://fakestoreapi.com/products', {method: 'GET', mode: 'cors'});

			const data = await response.json();

			setProductData(data); // Save data
			return data;

			// Else return the saved data
		} else return productData;
	};

	const router = createBrowserRouter([
		{
			path: '/',
			element: <App />,
			children: [
				{
					path: '/shop',
					element: <Shop />,
					loader: getAllProducts,
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
};

export default Router;
