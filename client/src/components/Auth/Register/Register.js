import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import LockIcon from "../../../assets/icons/LockIcon";
import UserIcon from "../../../assets/icons/UserIcon";
import classes from "./Register.module.css";
import TextInput from "../../UI/Inputs/TextInput/TextInput";
import Button from "../../UI/Button/Button";
import Paper from "../../UI/Paper/Paper";
import axios from '../../../shared/axios-api'
import {AuthContext} from "../../../shared/AuthContext"

const Register = props => {
	const { setIsAuthenticated, setUser } = useContext(AuthContext);

	const { register, errors, handleSubmit, setError, watch } = useForm({
		reValidateMode: "onSubmit",
		shouldFocusError: true,
	});

	const onSubmit = data => {
		axios
			.post("auth/register", data)
			.then(res => {
				axios
					.post("auth/login", data)
					.then(res => {	
						setUser(res.data.data);
						setIsAuthenticated(true);
					})
					.catch(err => {
						props.history.push("/login");
					});
			})
			.catch(err => {
				const username = document.getElementById("username");
				username.focus();
				setError("username", {
					type: "manual",
					message: err.response.data.error,
				});
			});
	};

	const blueDark = getComputedStyle(document.documentElement).getPropertyValue("--blue-dark");
	const usernameError = errors.username ? errors.username.message : null;
	const passwordError = errors.password ? errors.password.message : null;
	const confirmPasswordError = errors.confirmpassword ? errors.confirmpassword.message : null;

	return (
		<div className='center'>
			<div className={classes.RegisterContainer}>
				<Paper>
					<form onSubmit={handleSubmit(onSubmit)} className={classes.RegisterForm}>
						<TextInput
							name="username"
							id="username"
							Icon={UserIcon}
							label="username"
							errorMessage={usernameError}
							register={register({
								required: "This field is required",
								minLength: {
									value: "6",
									message: "Must be atleast 6 characters",
								},
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
								minLength: {
									value: "8",
									message: "Must be atleast 8 characters",
								},
							})}
						/>
						<TextInput
							name="confirmpassword"
							id="confirmpassword"
							type="password"
							errorMessage={confirmPasswordError}
							Icon={LockIcon}
							label="confirm password"
							register={register({
								validate: value => value === watch("password") || "Passwords don't match",
								required: "This field is required",
							})}
						/>
						<div className={classes.ButtonContainer}>
							<Button color={blueDark}>Register</Button>
						</div>
					</form>
					<div className={classes.LoginLink}>
						Already have an account? <Link to="/login">Login</Link>
					</div>
				</Paper>
			</div>
		</div>
	);
};

export default Register;
