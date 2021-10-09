import { useEffect } from 'react';
import styles from './App.module.css';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
//Authorising Admin
import { useSelector, useDispatch } from 'react-redux';
import { getAdminStatus } from './containers/Admin/adminSlice';
import { fetchPcs } from './containers/Devices/deviceSlice';

//Importing container (stateful) components
import Home from './containers/Home/Home';
import Admin from './containers/Admin/Admin';
import Manage from './containers/Manage/Manage';

//Importing presentational (stateless) components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

function App() {
	const dispatch = useDispatch();
	const adminStatus = useSelector((state) => state.adminStatus);
	const Pcs = useSelector((state) => state.Pcs.data);

	useEffect(() => {
		dispatch(getAdminStatus(localStorage.getItem('adminJwtToken')));
		dispatch(fetchPcs());
	}, []);

	const Private = ({ children, ...rest }) => {
		return (
			<Route
				{...rest}
				render={() => {
					return adminStatus.login ? (
						children
					) : (
						<Redirect
							to={{
								pathname: '/admin',
							}}
						/>
					);
				}}
			/>
		);
	};

	return (
		<div id={styles.mainContainer}>
			<Router>
				<Navbar />
				<div id={styles.contentWrap}>
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/admin">
							<Admin />
						</Route>
						<Private exact path="/manage">
							<Manage />
						</Private>
					</Switch>
				</div>
				{/* <Footer /> */}
			</Router>
		</div>
	);
}

export default App;
