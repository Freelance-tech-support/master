import React from "react";
import classes from "./TextField.module.css";

const TextField = props => {
	const { name, register, errorMessage, label, ...rest } = props;

	let error = null;
	if (errorMessage) {
		error = <span className={classes.ErrorMessage}> - {props.errorMessage}</span>;
	}

	return (
		<div className={classes.Input}>
			<div className={classes.LabelContainer}>
				<label className={classes.Label} for={name}>
					<span class={classes.LabelText}>{label}</span>
					{error}
				</label>
			</div>
			<textarea className={classes.TextField} rows="8" name={name} ref={register} {...rest} />
		</div>
	);
};

export default TextField;