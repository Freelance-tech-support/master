import React from "react";
import classes from "./Button.module.css";

const Button = props => {
	const { color, outlined, width, children, ...rest } = props;
	let style = {
		backgroundColor: color,
		border: "1.5px solid " + color,
		width,
	};
	if (outlined) {
		style = {
			...style,
			color,
			backgroundColor: "transparent",
		};
	}

	return (
		<button className={classes.Button} style={style} {...rest}>
			{children}
		</button>
	);
};

export default Button;