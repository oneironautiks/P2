import React from 'react';

function AnswerOptions(props) {
  return (
    <label className="radioLabel" htmlFor={props.answerType}>
      <li className="answers">
        <input
          type="radio"
          className="radioButton"
          name="radioGroup"
          checked={props.answerType === props.answer}
          id={props.answerId}
          value={props.answerId}
          disabled={props.answer}
          onChange={props.onAnswerSelected}
        />
        <span>{props.answerContent}</span>
        <span className="checkmark"></span>
      </li>
    </label>

  );
}

export default AnswerOptions;