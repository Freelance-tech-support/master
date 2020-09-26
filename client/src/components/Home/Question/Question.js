import React, { useState } from "react";
import classes from "./Question.module.css";
import MessageIcon from "../../../assets/icons/MessageIcon";
import VideoIcon from "../../../assets/icons/VideoIcon";
import Button from "../../UI/Button/Button";

const Question = props => {
	const [showDescription, setShowDescription] = useState(false);
	const blueDark = getComputedStyle(document.documentElement).getPropertyValue("--blue-dark");
	const blueLight = getComputedStyle(document.documentElement).getPropertyValue("--blue-light");
	const white = getComputedStyle(document.documentElement).getPropertyValue("--bg-primary");
	const gray = getComputedStyle(document.documentElement).getPropertyValue("--text-secondary");
	return (
		<div
			onClick={() => {
				setShowDescription(prev => !prev);
			}}
			className={classes.Question}
		>
			<div>
				<div className={classes.Top}>
					<div className={classes.User} style={{ color: props.isOnline ? blueLight : gray }}>
						<div
							className={classes.Online}
							style={{ borderColor: props.contactable ? blueLight : gray }}
						></div>
						<span>{props.user}</span>
					</div>
					<div className={classes.Elapsed}>{props.elapsed}</div>
				</div>
				<div className={classes.Title}>{props.title}</div>
				{showDescription && (
					<div className={classes.Bottom}>
						{props.description}
						{props.contactable && !props.own && (
							<div className={classes.Contact}>
								<Button color={blueDark}>
									Video Chat <span className={classes.Padding2}></span>{" "}
									<VideoIcon fill={white} />
								</Button>
								<div className={classes.Padding}></div>
								<Button color={blueDark}>
									Message <span className={classes.Padding2}></span>{" "}
									<MessageIcon fill={white} />
								</Button>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default Question;
