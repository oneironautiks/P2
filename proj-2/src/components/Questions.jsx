import React from 'react';

const Questions = (props) => {
  console.log(props)
  return (
    <div>
      <ul>
        <li>{props.content}</li>
      </ul>
    </div>
  )
}

export default Questions;