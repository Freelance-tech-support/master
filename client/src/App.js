import React, { useState, useContext, useEffect, useRef } from "react";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import Home from "./components/Home/Home";
import HomeLayout from "./components/Layout/Layout";
import BountyHunters from "./components/BountyHunters/BountyHunters";
import { Route, Switch, Redirect } from "react-router-dom";
import { AuthContext } from "./shared/AuthContext";
import Loader from "./components/UI/Loader/Loader";
import axios from "./shared/axios-api";
import io from "socket.io-client";
import RequestModal from "./components/RequestModal/RequestModal";
import CallModal from "./components/CallModal/CallModal";
import Peer from "simple-peer";
import classes from "./App.module.css";

const App = () => {
	const [users, setUsers] = useState({});
	const [receivingCall, setReceivingCall] = useState(false);
	const [stream, setStream] = useState();
	const [callerName, setCallerName] = useState("");
	const [caller, setCaller] = useState("");
	const [callerSignal, setCallerSignal] = useState();
	const [callAccepted, setCallAccepted] = useState(false);

	const socket = useRef();
	const userVideo = useRef();
	const partnerVideo = useRef();

	const [isLoading, setIsLoading] = useState(true);
	const { isAuthenticated, setIsAuthenticated, setUser, user } = useContext(AuthContext);

	useEffect(() => {
		setIsLoading(true);
		axios
			.get("/auth/me")
			.then(res => {
				setIsAuthenticated(true);
				setUser(res.data.data);

				//////////////////////////////////
				if (!socket.current) {
					socket.current = io.connect("https://spacebounties.herokuapp.com/");
					const username = res.data.data.username;
					socket.current.emit("username", username);
				}

				socket.current.on("allUsers", data => {
					setUsers(data);
				});

				socket.current.on("hey", data => {
					setReceivingCall(true);
					setCaller(data.from);
					setCallerName(data.fromName);
					setCallerSignal(data.signal);
				});

				////////////////////////////////////

				axios.post("/auth/status", { isOnline: true });
				setIsLoading(false);
			})
			.catch(e => {
				setIsAuthenticated(false);
				setUser({});
				setIsLoading(false);
			});
	}, [isAuthenticated]);

	useEffect(() => {
		const cleanup = () => {
			axios.post("/auth/status", { isOnline: false });
		};
		window.addEventListener("beforeunload", cleanup);
		return () => {
			window.removeEventListener("beforeunload", cleanup);
		};
	}, []);

	function callPeer(id) {
		const peer = new Peer({
			initiator: true,
			trickle: false,
			config: {
				iceServers: [
					{
						urls: "stun:numb.viagenie.ca",
						username: "sultan1640@gmail.com",
						credential: "98376683",
					},
					{
						urls: "turn:numb.viagenie.ca",
						username: "sultan1640@gmail.com",
						credential: "98376683",
					},
				],
			},
			stream: stream,
		});

		peer.on("signal", data => {
			socket.current.emit("callUser", {
				userToCall: id,
				signalData: data,
				from: users[user.username],
				fromName: user.username,
			});
		});

		peer.on("stream", stream => {
			if (partnerVideo.current) {
				partnerVideo.current.srcObject = stream;
			}
		});

		socket.current.on("callAccepted", signal => {
			setCallAccepted(true);
			peer.signal(signal);
		});
	}

	function acceptCall() {
		setCallAccepted(true);
		setReceivingCall(false);
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: stream,
		});
		peer.on("signal", data => {
			socket.current.emit("acceptCall", { signal: data, to: caller });
		});

		peer.on("stream", stream => {
			partnerVideo.current.srcObject = stream;
		});

		peer.signal(callerSignal);
	}

	const closeRequestModal = () => {
		setReceivingCall(false);
		setCaller("");
		setCallerName("");
		setCallerSignal();
	};

	const endCall = () => {
		setReceivingCall(false);
		setCaller("");
		setCallerName("");
		setCallerSignal();
		setStream();
		setCallAccepted(false);
	};

	onclick = () => {
		axios.post("/auth/login", { username: "dtues003", password: "tuesta0823" });
	};

	//-----------------------------------------------------------------------------------------
	let routes;
	if (isAuthenticated) {
		routes = (
			<HomeLayout socket={socket}>
				<CallModal show={callAccepted} onClose={endCall} />
				<RequestModal
					show={receivingCall}
					accept={acceptCall}
					caller={callerName}
					onClose={closeRequestModal}
				/>
				<Switch>
					<Route
						path="/bounties"
						render={() => <Home users={users} call={id => callPeer(id)} />}
					/>
					<Route path="/hire" />
					<Route
						path="/bountyhunters"
						render={() => <BountyHunters users={users} call={id => callPeer(id)} />}
					/>
					<Redirect to="/bounties" />
				</Switch>
			</HomeLayout>
		);
	} else {
		routes = (
			<div>
				<Switch>
					<Route path="/login" component={Login} />
					<Route path="/register" component={Register} />
					<Redirect to="/register" />
				</Switch>
			</div>
		);
	}

	const loading = (
		<div className="center">
			<Loader label="Loading..." />
		</div>
	);

	return <div className="App">{isLoading ? loading : routes}</div>;
};

export default App;
