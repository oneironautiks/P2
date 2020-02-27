import React, { Component } from 'react';
import axios from 'axios';
//import FilmList from './FilmList';
// import Questions from './Questions';
import Game from './Game';
// import Answers from './Answers'
// import QuestionsCount from './QuestionsCount';

const BASE_URL = 'https://ghibliapi.herokuapp.com/films';
const descrips = [];
const titles = [];

class Container extends Component {
  constructor() {
    super();
    this.state = {
      films: [],
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      answer: '',
      answersCount: {},
      result: '',
      correctAnswers: {}
    };
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }

  fetchData = async () => {
    try {
      const res = await axios.get(BASE_URL);
      console.log(res.data)
      this.setState({
        films: res.data
      })
    }
    catch (err) {
      console.log(err);
    }
  }

  async componentDidMount() {
    await this.fetchData();
    let { films } = this.state;
    const { correctAnswers } = this.state;
    console.log(films);

    films.map((film) => titles.push(film.title));

    films.map((film) => descrips.push(film.description));
    titles.forEach((title, i) => correctAnswers[title] = descrips[i]);
    console.log(correctAnswers)
    const shuffledAnswers = this.shuffleArray(titles);
    this.setState({
      question: descrips[0],
      answerOptions: shuffledAnswers,
      correctAnswers: correctAnswers
    });
  }


  shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  setUserAnswer(answer) {
    this.setState((state) => ({
      answersCount: {
        ...state.answersCount,
        [answer]: (state.answersCount[answer] || 0) + 1
      },
      answer: answer
    }));
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;
    const { films } = this.state;
    console.log(films)
    this.setState({
      counter: counter,
      questionId: questionId,
      question: this.state.films[counter].description,
      answer: ''
    });
  }


  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);
    if (this.state.questionId < this.state.films.length) {
      setTimeout(() => this.setNextQuestion(), 300);
    } else {
      // do nothing for now
      setTimeout(() => this.setResults(this.getResults()), 300);

    }
  }

  render() {

    console.log(this.state.answerOptions)
    return (
      <div>
        <Game
          answer={this.state.answer}
          answerOptions={this.state.answerOptions}
          questionId={this.state.questionId}
          question={this.state.question}
          questionTotal={this.state.films.length}
          onAnswerSelected={this.handleAnswerSelected}
          correctAnswers={this.state.correctAnswers}
        />
      </div>
    )
  }
}

export default Container;