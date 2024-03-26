import { useState } from "react";

import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";

import QUESTIONS from "../questions";

const Question = ({ questionIndex, onSelectAnswer, onSkipAnswer }) => {

    const [answer, setAnswer] = useState({
        selectedAnswer: "",
        correct: null,
    });

    let timer = 10000;

    if (answer.selectedAnswer) {
        timer = 1000;
    }

    if (answer.correct !== null) {
        timer = 2000;
    }

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
                key={timer}
                timeout={timer}
                onTimeOut={answer.selectedAnswer === "" ? onSkipAnswer : null}
                mode={answerState}
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