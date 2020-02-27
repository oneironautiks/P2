import React from 'react';
import Questions from './Questions';
import QuestionsCount from './QuestionsCount';
import AnswerOptions from './AnswerOptions';

const Game = (props) => {

  const renderAnswerOptions = (answer) => {
    return (
      <AnswerOptions
        key={props.answerOptions.indexOf(answer)}
        answerContent={answer}
        answerType={answer.type}
        answer={props.answer}
        questionId={props.questionId}
        onAnswerSelected={props.onAnswerSelected}
      />
    );
  }
  console.log(props.correctAnswers)
  return (
    <div className="game">
      <QuestionsCount
        counter={props.questionId}
        total={props.questionTotal}
      />
      <Questions content={props.question} />
      <ul className="answerOptions">
        {props.answerOptions.map(renderAnswerOptions)}
      </ul>
    </div>
  );
}


export default Game;