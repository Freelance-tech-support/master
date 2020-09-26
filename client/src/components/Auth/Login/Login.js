import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import LockIcon from "../../../assets/icons/LockIcon";
import UserIcon from "../../../assets/icons/UserIcon";
import classes from "./Login.module.css";
import TextInput from "../../UI/Inputs/TextInput/TextInput";
import Button from "../../UI/Button/Button";
import Paper from "../../UI/Paper/Paper";

const Login = props => {
	const { register, errors, handleSubmit, setError } = useForm({
		reValidateMode: "onSubmit",
		shouldFocusError: true,
	});

	const onSubmit = () => {};

	const buttonColor = getComputedStyle(document.documentElement).getPropertyValue("--blue-dark");
	const usernameError = errors.username ? errors.username.message : null;
	const passwordError = errors.password ? errors.password.message : null;

	return (
		<div className={classes.Center}>
			<div className={classes.LoginContainer}>
				<Paper>
					<form onSubmit={handleSubmit(onSubmit)} className={classes.LoginForm}>
						<TextInput
							name="username"
							id="username"
							Icon={UserIcon}
							label="username"
							errorMessage={usernameError}
							register={register({
								required: "This field is required",
							})}
						/>
						<TextInput
							name="password"
							type="password"
							label="password"
							Icon={LockIcon}
							errorMessage={passwordError}
							id="password"
							register={register({
								required: "This field is required",
							})}
						/>
						<div className={classes.ButtonContainer}>
							<Button color={buttonColor}>Login</Button>
						</div>
					</form>
					<div className={classes.RegisterLink}>
						Need an account? <Link to="/register">Register</Link>
					</div>
				</Paper>
			</div>
		</div>
	);
};

export default Login;
