import React from 'react';
import Questions from './Questions';
import QuestionsCount from './QuestionsCount';
import AnswerOptions from './AnswerOptions';

const Game = (props) => {
  const renderAnswerOptions = (answer) => {
    console.log(props.answer)
    return (
      <AnswerOptions
        key={answer.id}
        answerContent={answer.answer}
        answerType={answer.type}
        answerId={answer.id}
        answer={props.answer}
        questionId={props.questionId}
        onAnswerSelected={props.onAnswerSelected}
      />
    );
  }
  return (
    <div className="game">
      <QuestionsCount
        counter={props.questionId}
        total={props.questionTotal}
      />
      <Questions
        content={props.question} />
      <ul className="answerOptions">
        {props.answerOptions.map(renderAnswerOptions)}
      </ul>
    </div>
  );
}


export default Game;