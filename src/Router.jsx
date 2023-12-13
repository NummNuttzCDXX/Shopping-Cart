import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import Shop from './components/Shop/Shop';
import App from './components/App/App';
import {useState} from 'react';
import Product from './components/Product/Product';
import ErrorPage from './components/Error/Error';
import Checkout from './components/Checkout/Checkout';

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
				{
					path: '/shop/category/:category',
					element: <Shop />,
					loader: async ({params}) => (
						await fetch(`https://fakestoreapi.com/products/category/${params.category}`, {mode: 'cors', method: 'GET'})
					),
				},
				{
					path: '/shop/product/:prodId',
					element: <Product />,
					loader: async ({params}) => await fetch(`https://fakestoreapi.com/products/${params.prodId}`, {mode: 'cors', method: 'GET'}),
				},
				{
					path: '/checkout',
					element: <Checkout />,
				},
			],
			ErrorBoundary: ErrorPage,
		},
	]);

	return <RouterProvider router={router} />;
};

export default Router;
