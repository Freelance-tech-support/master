import React, { useState, useEffect } from "react";
import Question from "./Question/Question";
import axios from "../../shared/axios-api";

const Home = props => {
	const [questions, setQuestions] = useState([]);
	useEffect(() => {
		axios.get("/question").then(res => {
			setQuestions(res.data.data);
		});
	}, []);

	const questionsList = questions.map(question => {
		return (
			<Question
				user={question.user.username}
				title={question.title}
				description={question.description}
			/>
		);
	});
	return <div>{questionsList}</div>;
};

export default Home;
