import styles from './Error.module.css';
import {useNavigate, useRouteError} from 'react-router-dom';

const ErrorPage = () => {
	const err = useRouteError();
	const nav = useNavigate();

	// Print error only to see why the page is showing
	console.error(err); // eslint-disable-line no-console

	return (
		<div className={styles.errorPage} >
			<h1>Uh Oh!</h1>
			<p>There seems to be a problem finding the page you are looking for...</p>

			{/* Navigate to last visited page on click */}
			<p className={styles.goBack} onClick={() => nav(-1)}>
				Click here to go back
			</p>
		</div>
	);
};

export default ErrorPage;
