import React from "react";
import classes from "./Hunter.module.css";
import MessageIcon from "../../../assets/icons/MessageIcon";
import VideoIcon from "../../../assets/icons/VideoIcon";

const Hunter = props => {
	const blueDark = getComputedStyle(document.documentElement).getPropertyValue("--blue-dark");
	const blueLight = getComputedStyle(document.documentElement).getPropertyValue("--blue-light");
	const white = getComputedStyle(document.documentElement).getPropertyValue("--bg-primary");
	const gray = getComputedStyle(document.documentElement).getPropertyValue("--text-secondary");
	return (
		<div className={classes.Hunter}>
			<div>
				<div
					className={classes.User}
					style={{ color: props.hunter.isOnline ? blueLight : gray }}
				>
					<div
						className={classes.Online}
						style={{ borderColor: props.hunter.isOnline ? blueLight : gray }}
					></div>
					<span>{props.hunter.username}</span>
				</div>
				<div className={classes.Collected}>
					Bounties Collected:{" "}
					<span className={classes.Bounty}>{props.hunter.totalBounties}</span>
				</div>
			</div>
			{props.hunter.isOnline && !props.isMe && (
				<div className={classes.Buttons}>
					<div className={classes.CircularButton} onClick={() => props.call(props.socketId)}>
						<VideoIcon fill={white} />
					</div>
					<div className={classes.CircularButton}>
						<MessageIcon fill={white} />
					</div>
				</div>
			)}
		</div>
	);
};

export default Hunter;
