import React, { useContext } from "react";
import classes from "./Layout.module.css";
import { NavLink } from "react-router-dom";
import HomeIcon from "../../assets/icons/HomeIcon";
import MoneyIcon from "../../assets/icons/MoneyIcon";
import LassoIcon from "../../assets/icons/LassoIcon";
import Button from "../UI/Button/Button";
import axios from "../../shared/axios-api";
import { AuthContext } from "../../shared/AuthContext";

const Layout = props => {
	const { setUser, setIsAuthenticated } = useContext(AuthContext);
	const onLogOut = () => {
		axios.post("/auth/status", { isOnline: false }).then(res => {
			axios.get("auth/logout").then(res => {
				setIsAuthenticated(false);
				setUser({});
			});
		});
	};

	const activeLink = {
		textDecoration: "none",
		backgroundColor: "#1e3674",
		borderLeft: "1px solid #fafafa86",
		borderRight: "1px solid #fafafa86",
	};
	const pinkDark = getComputedStyle(document.documentElement).getPropertyValue("--pink-dark");
	return (
		<div className={classes.Layout}>
			<nav className={classes.Nav}>
				<div className={classes.Title}>
					<div className={classes.Title}>Space Bounties</div>
				</div>
				<div className={classes.Links}>
					<NavLink to="/bounties" activeStyle={activeLink} className={classes.Link}>
						<div className={classes.LinkContent}>
							<MoneyIcon />
							<div>Bounties</div>
						</div>
					</NavLink>
					<NavLink to="/bountyhunters" activeStyle={activeLink} className={classes.Link}>
						<div className={classes.LinkContent}>
							<HomeIcon />
							<div>Bounty Hunters</div>
						</div>
					</NavLink>
					<NavLink to="/hire" activeStyle={activeLink} className={classes.Link}>
						<div className={classes.LinkContent}>
							<LassoIcon />
							<div>Hire Someone</div>
						</div>
					</NavLink>
					<div className={classes.Logout}>
						<div>
							<Button onClick={onLogOut} outlined color={pinkDark} width="6rem">
								Log out
							</Button>
						</div>
					</div>
				</div>
			</nav>

			<main className={classes.Body}>{props.children}</main>
		</div>
	);
};

export default Layout;
