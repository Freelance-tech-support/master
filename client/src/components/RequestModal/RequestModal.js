import React from "react";
import "./RequestModal.module.css";
import Modal from "../UI/Modal/Modal";
import Button from "../UI/Button/Button";
import classes from "./RequestModal.module.css";

const RequestModal = props => {
	const blueDark = getComputedStyle(document.documentElement).getPropertyValue("--blue-dark");
	const pinkDark = getComputedStyle(document.documentElement).getPropertyValue("--pink-dark");

	return (
		<Modal show={props.show} dontCloseOnOverlay onClose={props.onClose}>
			<div className={classes.Modal}>
				<div className={classes.Label}>
					<span style={{ fontWeight: "600" }}>{props.caller}</span> would like to discuss a
					bounty
				</div>
				<div className={classes.Buttons}>
					<Button color={blueDark} onClick={props.accept}>
						Accept
					</Button>
					<Button color={pinkDark} outlined onClick={props.onClose}>
						Decline
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export default RequestModal;
