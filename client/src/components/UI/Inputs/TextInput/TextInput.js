import React from "react";
import classes from "./TextInput.module.css"

const TextInput = props => {
	const { name, register, Icon, errorMessage, label, ...rest } = props;
	let inputIcon = null;
	if (Icon) {
		inputIcon = <Icon className={classes.Icon} />;
   }
   
   let error = null;
   if (errorMessage) {
      error = <span className={classes.ErrorMessage}> - {props.errorMessage}</span>
   }
	return (
		<div className={classes.Input}>
			<input
				name={name}
				ref={register}
				{...rest}
				style={{ paddingLeft: Icon && "2.7rem" }}
			/>
			{inputIcon}
			<label for={name} class={classes.Label}>
				<span class={classes.LabelText}>{label}</span>
            {error}
			</label>
		</div>
	);
};

export default TextInput;