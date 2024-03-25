import { useState } from "react";

import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";

import QUESTIONS from "../questions";

const Question = ({ questionIndex, onSelectAnswer, onSkipAnswer }) => {

    const [answer, setAnswer] = useState({
        selectedAnswer: "",
        correct: null,
    });

    const handleSelectAnswer = (answer) => {
        setAnswer({
            selectedAnswer: answer,
            correct: null,
        })

        setTimeout(() => {
            setAnswer({
                selectedAnswer: answer,
                correct: QUESTIONS[questionIndex].answers[0] === answer,
            })

            setTimeout(() => {
                onSelectAnswer(answer);
            }, 2000);
        }, 1000);
    };

    let answerState = "";

    if(answer.selectedAnswer && answer.correct !== null) {
        answerState = answer.correct ? "correct" : "wrong";
    } else if (answer.selectedAnswer) {
        answerState = "answered";
    }

    return (
        <div id="question">
            <QuestionTimer
                timeout={10000}
                onTimeOut={onSkipAnswer}
            />
            <h2>{QUESTIONS[questionIndex].text}</h2>
            <Answers
                answers={QUESTIONS[questionIndex].answers}
                selectedAnswer={answer.selectedAnswer}
                answerState={answerState}
                onSelect={handleSelectAnswer}
            />
        </div>
    );
}

export default Question;