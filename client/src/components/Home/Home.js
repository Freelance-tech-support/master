import React, { useContext } from "react";
import Button from "../UI/Button/Button";
import axios from "../../shared/axios-api";
import { AuthContext } from "../../shared/AuthContext";

const Home = props => {
	const { setUser, setIsAuthenticated } = useContext(AuthContext);
	const onLogOut = () => {
		axios.get("auth/logout").then(res => {
			setIsAuthenticated(false);
			setUser({});
		});
	};
	const pinkDark = getComputedStyle(document.documentElement).getPropertyValue("--pink-dark");
	return (
		<div>
			Home
			<Button onClick={onLogOut} color={pinkDark} outlined>
				Log out
			</Button>
		</div>
	);
};

export default Home;
