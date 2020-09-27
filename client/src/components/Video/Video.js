import React, { useState, useEffect, useRef } from "react";
import classes from "./Video.module.css";

const Video = props => {
   const [stream, setStream] = useState();
   const userVideo = useRef();

   useEffect(() => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
        setStream(stream);
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }
      })
    }, []);

	let UserVideo;
	if (stream) {
		UserVideo = <video className={classes.Video} playsInline muted ref={userVideo} autoPlay />;
	}

	return (
		<div className={classes.Container}>
			<div className={classes.Row}>{UserVideo}</div>
		</div>
	);
};

export default Video;
