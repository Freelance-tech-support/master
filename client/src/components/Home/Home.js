import React, { useState, useEffect, useContext } from "react";
import Question from "./Question/Question";
import axios from "../../shared/axios-api";
import classes from "./Home.module.css";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import PlusIcon from "../../assets/icons/PlusIcon";
import Modal from "../UI/Modal/Modal";
import PostForm from "./PostForm/PostForm";
import Video from "../Video/Video";
import { AuthContext } from "../../shared/AuthContext";
import Header from "../UI/Header/Header";

const Home = props => {
	const [showModal, setShowModal] = useState(false);
	const [questions, setQuestions] = useState([]);
	const { user } = useContext(AuthContext);
	useEffect(() => {
		updateQuestions();
	}, []);

	const updateQuestions = () => {
		axios.get("/question").then(res => {
			let unanswered = res.data.data.filter(q => !q.completed);
			unanswered.reverse();
			setQuestions(unanswered);
		});
	};
	console.log(props.users)
	TimeAgo.addLocale(en);
	const timeAgo = new TimeAgo();
	const questionsList = questions.map(question => {
		return (
			<Question
				user={question.user.username}
				call={(id) => props.call(id)}
				socketId={props.users && props.users[question.user.username]}
				own={question.user._id === user._id}
				title={question.title}
				description={question.description}
				elapsed={timeAgo.format(Date.now() - (Date.now() - question.createdAt))}
				contactable={question.user.isOnline}
			/>
		);
	});
	return (
		<div className={classes.Home}>
			<Header>Bounties</Header>
			<Modal show={showModal} onClose={() => setShowModal(false)}>
				<PostForm update={updateQuestions} close={() => setShowModal(false)} />
			</Modal>
			<div className={classes.QuestionsList}>
				<div className={classes.Add}>
					<span className={classes.AddText}>Have a question? </span>
					<div onClick={() => setShowModal(true)} className={classes.CircularButton}>
						<PlusIcon />
					</div>
				</div>
				<div>{questionsList}</div>
			</div>
		</div>
	);
};

export default Home;
