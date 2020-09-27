import React from "react";
import Modal from "../UI/Modal/Modal";
import Button from "../UI/Button/Button";
import classes from "./CallModal.module.css";
import Video from "../Video/Video";

const CallModal = props => {
	const pinkDark = getComputedStyle(document.documentElement).getPropertyValue("--pink-dark");
	return (
		<Modal show={props.show} dontCloseOnOverlay onClose={props.onClose}>
			<div className={classes.Modal}>
				<div className={classes.Label}></div>
				<div className={classes.Videos}>
					<div style={{fontSize: '2.4rem', textAlign: 'center'}}>
						{props.username}
						<Video />
					</div>
					<div className={classes.Padding}></div>
					<div style={{fontSize: '2.4rem', textAlign: 'center'}}>
						{props.callerName}
						{props.children}
					</div>
				</div>

				<div className={classes.Buttons} >
					<Button color={pinkDark} outlined onClick={props.onClose}>
						Leave
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export default CallModal;
