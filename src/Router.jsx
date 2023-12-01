import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import App from './components/App/App';

const Router = () => {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <App />,
		},
	]);

	return <RouterProvider router={router} />;
};

export default Router;
