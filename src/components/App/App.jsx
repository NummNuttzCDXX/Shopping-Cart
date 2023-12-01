import styles from './App.module.css';
import Head from '../Head/Head';
import {Outlet} from 'react-router-dom';

function App() {
	return (
		<>
			<Head />

			<main >
				<Outlet />
			</main>
		</>
	);
}

export default App;
