import { useEffect, useState } from "react";

const QuestionTimer = ({ timeout, onTimeOut }) => {

    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        const timer = setTimeout(onTimeOut, timeout);

        return () => {
            clearTimeout(timer);
        };
    }, [timeout, onTimeOut]);

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime(prevRemaningTime => prevRemaningTime - 100);
        }, 100);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <progress id="question-time" value={remainingTime} max={timeout}/>
    );
}

export default QuestionTimer;