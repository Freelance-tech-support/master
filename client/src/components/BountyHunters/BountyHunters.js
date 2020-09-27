import React, { useState, useEffect, useContext } from "react";
import classes from "./BountyHunters.module.css";
import Hunter from "./Hunter/Hunter";
import axios from "../../shared/axios-api";
import Header from "../UI/Header/Header";
import { AuthContext } from "../../shared/AuthContext";
const BountyHunters = props => {
	const [hunters, setHunters] = useState([]);
	const { user } = useContext(AuthContext);
	useEffect(() => {
		axios.get("/users").then(res => {
			setHunters(res.data.data);
		});
	}, []);
	const huntersList = hunters.map(h => {
		return <Hunter hunter={h} call={() => props.call(props.users[h.username])} isMe={user.username === h.username}></Hunter>;
	});
	return (
		<div className={classes.BountyHunters}>
			<Header>Top Bounty Hunters</Header>
			<div style={{ paddingTop: "5rem" }}>{huntersList}</div>
		</div>
	);
};

export default BountyHunters;
