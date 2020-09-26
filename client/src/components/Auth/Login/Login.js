import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import LockIcon from "../../../assets/icons/LockIcon";
import UserIcon from "../../../assets/icons/UserIcon";
import classes from "./Login.module.css";
import TextInput from "../../UI/Inputs/TextInput/TextInput";
import Button from "../../UI/Button/Button";
import Paper from "../../UI/Paper/Paper";
import axios from "../../../shared/axios-api";
import { AuthContext } from "../../../shared/AuthContext";

const Login = props => {
	const { setUser, setIsAuthenticated } = useContext(AuthContext);
	const { register, errors, handleSubmit, setError } = useForm({
		reValidateMode: "onSubmit",
		shouldFocusError: true,
	});

	const onSubmit = data => {
		axios
			.post("/auth/login", data)
			.then(res => {
				setIsAuthenticated(true);
				setUser(res.data.data);
			})
			.catch(err => {
				const username = document.getElementById("username");
				username.focus();
				setError("username", {
					type: "manual",
					message: err.response.data.error,
				});
				setError("password", {
					type: "manual",
					message: err.response.data.error,
				});
			});
	};

	const blueDark = getComputedStyle(document.documentElement).getPropertyValue("--blue-dark");
	const usernameError = errors.username ? errors.username.message : null;
	const passwordError = errors.password ? errors.password.message : null;

	return (
		<div className="center">
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
							<Button color={blueDark}>Login</Button>
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
