import React, { Component } from 'react';
import axios from 'axios';
//import FilmList from './FilmList';
// import Questions from './Questions';
import Game from './Game';
// import Answers from './Answers'
// import QuestionsCount from './QuestionsCount';

const BASE_URL = 'https://ghibliapi.herokuapp.com/films';
// const  =[];
// const titles = [];

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
      score: 0
    };
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }

  fetchData = async () => {
    try {
      const res = await axios.get(BASE_URL);
      //console.log(res.data)
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
    //const { correctAnswers } = this.state;
    //films.map((film) => titles.push(film.title));
    const questions = films.map(film => ({
      id: film.id,
      question: film.description
    }));
    const answers = films.map(film => ({
      id: film.id,
      answer: film.title
    }));
    //films.map((film) => descrips.push(film.description));
    //titles.forEach((title, i) => correctAnswers[title] = descrips[i]);
    //const shuffledAnswers = this.shuffleArray(titles);
    this.setState({
      question: questions[this.state.questionId - 1],
      answerOptions: answers,
    });
  }


  shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
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
    //console.log(answer)
    //console.log(this.state.question.id)
    this.checkAnswers(answer);
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;
    const { films } = this.state;
    //console.log(films)
    const questions = films.map(film => ({
      id: film.id,
      question: film.description
    }));
    this.setState({
      counter: counter,
      questionId: questionId,
      question: questions[questionId - 1],
      answer: ''
    });
  }


  handleAnswerSelected(event) {
    //console.log(event.target.value)
    this.setUserAnswer(event.currentTarget.value);
    if (this.state.questionId < this.state.films.length) {
      setTimeout(() => this.setNextQuestion(), 300);
    } else {
      setTimeout(() => this.setResults(this.getResults()), 300);

    }

  }

  checkAnswers = (answer) => {
    console.log(answer)
    const { question } = this.state;
    //(answer === question.id) ? alert('Correct!') : alert('Sorry, wrong answer')
    if (answer === question.id) {
      const { score } = this.state;
      this.setState({
        score: score + 1
      });

    } else {

    }
  }

  render() {

    //console.log(this.state.answer)
    //console.log(this.state.question)
    console.log(this.state.score)
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