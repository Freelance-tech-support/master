import React from "react";
import classes from "./Loader.module.css";

const Loader = props => {
	return (
		<div className={classes.Container}>
			{props.label && <div className={classes.Label}>{props.label}</div>}
			<div className={classes.Loader}>Loading...</div>
		</div>
	);
};

export default Loader;
