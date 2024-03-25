import { useCallback, useState } from "react";
import QUESTIONS from "../questions.js"
import quizCompleteImage from "../assets/quiz-complete.png";
import Question from "./Question.jsx";

const Quiz = () => {
    const [userAnswers,setUserAnswers] = useState([]);
    const activeQuestionIndex = userAnswers.length;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback((selectedAnswer) => {
        setUserAnswers((prevSelectedAnswer) => {
            return [...prevSelectedAnswer, selectedAnswer]
        });
    }, []);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    if (quizIsComplete) {
        return <div id="summary">
            <img src={quizCompleteImage} alt="Trophy icon" />
            <h2>Quiz completed!</h2>
        </div>
    }

    return (
        <div id="quiz">
            <Question
                key={activeQuestionIndex}
                questionIndex={activeQuestionIndex}
                onSelectAnswer={handleSelectAnswer}
                onSkipAnswer={handleSkipAnswer}
            />
        </div>
    );
}

export default Quiz;