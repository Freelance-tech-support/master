import React from "react";
import axios from "../../../shared/axios-api";
import Button from "../../UI/Button/Button";
import { useForm } from "react-hook-form";
import classes from './PostForm.module.css'
import TextInput from '../../UI/Inputs/TextInput/TextInput'
import TextField from '../../UI/Inputs/TextField/TextField'

const PostForm = props => {
	const { register, errors, handleSubmit } = useForm({
		reValidateMode: "onSubmit",
		shouldFocusError: true,
	});

	const onSubmit = data => {
		axios.post("/question", data).then(res => {
         props.update();
         props.close()
		});
	};

   const blueDark = getComputedStyle(document.documentElement).getPropertyValue("--blue-dark");
   const pinkDark = getComputedStyle(document.documentElement).getPropertyValue("--pink-dark");

	const titleError = errors.title ? errors.title.message : null;
	const descriptionError = errors.description ? errors.description.message : null;

	return (
		<div className={classes.PostForm}>
			<form onSubmit={handleSubmit(onSubmit)} className={classes.LoginForm}>
				<TextInput
					name="title"
					id="title"
					label="title"
					errorMessage={titleError}
					register={register({
						required: "This field is required",
					})}
				/>
				<TextField
					name="description"
					type="description"
					label="description"
					errorMessage={descriptionError}
					id="description"
					register={register({
						required: "This field is required",
					})}
				/>
				<div className={classes.ButtonContainer}>
					<Button color={blueDark}>Post</Button>
               <Button color={pinkDark} outlined onClick={props.close}>Cancel</Button>
				</div>
			</form>
		</div>
	);
};

export default PostForm;
