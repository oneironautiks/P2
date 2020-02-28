import React from 'react';

const FilmList = (props) => {
  console.log(props)
  return (
    <div>
      <ul>
        <li>{props.title}</li>
      </ul>
    </div>
  )
}

export default FilmList;