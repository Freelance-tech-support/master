import React, { useState, useContext, useEffect } from "react";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import Home from './components/Home/Home'
import { Route, Switch, Redirect } from "react-router-dom";
import { AuthContext } from "./shared/AuthContext";
import Loader from "./components/UI/Loader/Loader";
import axios from "./shared/axios-api";

const App = () => {
	const [isLoading, setIsLoading] = useState(true);
	const { isAuthenticated, setIsAuthenticated, setUser } = useContext(AuthContext);

	useEffect(() => {
		setIsLoading(true);
		axios
			.get("/auth/me")
			.then(res => {
				setIsAuthenticated(true);
				setUser(res.data.data);
				setIsLoading(false)
			})
			.catch(e => {
				setIsAuthenticated(false);
				setUser({});
				setIsLoading(false)
			});
	}, [isAuthenticated]);

	let routes;
	if (isAuthenticated) {
		routes = (
			<Switch>
				<Route path="/home" component={Home} />
				<Redirect to="/home" />
			</Switch>
		);
	} else {
		routes = (
			<Switch>
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				<Redirect to="/register" />
			</Switch>
		);
	}

	const loading = (
		<div className="center">
			<Loader label="Loading..." />
		</div>
	);

	return <div className="App">{isLoading ? loading : routes}</div>;
};

export default App;
