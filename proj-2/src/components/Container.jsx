import React, { Component } from 'react';
import axios from 'axios';
//import FilmList from './FilmList';
// import Questions from './Questions';
import Game from './Game';
//import Modal from './Modal';
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
      answersId: '',
      totalAnswers: {},
      score: 0,
      correctAnswers: {},
      incorrectAnswers: {},
      //isModalOpen: false,
      results: []
    };
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    // this.renderModal = this.renderModal.bind(this);
    // this.openModal = this.openModal.bind(this);
    // this.closeModal = this.closeModal.bind(this);
  }

  fetchData = async () => {
    try {
      const res = await axios.get(BASE_URL);
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


  // shuffleArray(array) {
  //   var currentIndex = array.length, temporaryValue, randomIndex;

  //   while (0 !== currentIndex) {
  //     randomIndex = Math.floor(Math.random() * currentIndex);
  //     currentIndex -= 1;
  //     temporaryValue = array[currentIndex];
  //     array[currentIndex] = array[randomIndex];
  //     array[randomIndex] = temporaryValue;
  //   }

  //   return array;
  // };

  setUserAnswer(answer, id) {
    this.setState(state => ({
      totalAnswers: {
        ...state.totalAnswers,
        [id]: answer,
      },
      answer: { [id]: answer },
      answersId: id
    }));
  }

  setNextQuestion() {
    //console.log(this.state.answer)
    //console.log(this.state.answersId);
    //console.log(this.state.totalAnswers)
    const { answer } = this.state;
    const { answersId } = this.state;
    this.checkAnswers(answer, answersId)
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
    this.setUserAnswer(event.currentTarget.value, event.currentTarget.id);
    // const { correctAnswers } = this.state;
    // console.log(correctAnswers)
    if (this.state.questionId < this.state.films.length) {
      setTimeout(() => this.setNextQuestion(), 300);
    } else {
      setTimeout(() => this.getResults(this.state.correctAnswers, this.state.incorrectAnswers), 300);
      alert(`${this.state.results}`);
    }
  }

  getResults = (correct, incorrect) => {
    //console.log(correct);

    //console.log(incorrect)
    const cValues = Object.values(correct);
    const iValues = Object.values(incorrect);
    //console.log(cValues.length)
    const results = [cValues, iValues];
    //console.log(results);
    this.setState({
      results: results
    });
  }

  checkAnswers = (answer, id) => {
    // console.log(this.state.answer)
    // console.log(Object.keys(answer))
    const { question } = this.state;
    const { score } = this.state;
    //console.log(answer)
    // console.log(question.id)
    //(answer === question.id) ? alert('Correct!') : alert('Sorry, wrong answer')
    if (Object.keys(answer) == question.id) {
      // let { correctAnswers } = this.state;
      // correctAnswers += answer;
      this.setState(state => ({
        score: score + 1,
        correctAnswers: {
          ...state.correctAnswers,
          ...answer
        }
      }))
      //console.log(this.state.correctAnswers)
    }
    else {
      this.setState(state => ({
        incorrectAnswers: {
          ...state.incorrectAnswers,
          ...answer
        }
      }))
      //console.log(this.state.incorrectAnswers)
    }
  }


  // openModal() {
  //   this.setState({ isModalOpen: true })
  // }

  // closeModal() {
  //   this.setState({ isModalOpen: false })
  // }

  // close = (e) => {
  //   e.preventDefault();
  //   if (props.onClose) {
  //     return props.onClose();
  //   }
  // }

  // renderModal = (results) => {
  //   console.log(results[0]);
  //   const congrats = results[0].map(res => <h3 className="congrats">{res}</h3>);
  //   const sorry = results[1].map(res => <h3 className="sad-clown">{res}</h3>);

  //   this.openModal();
  //   return (
  //     <>
  //       <div className="modal">
  //         <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
  //           <h1>Modal title</h1>
  //           <p>hello</p>
  //           {congrats}
  //           {sorry}
  //           <p><button onClick={() => this.closeModal()}>Close</button></p>
  //         </Modal>
  //       </div>
  //       <div className="backdrop"></div>
  //     </>
  //   )
  // }

  // renderResults = () => {
  //   // this.setState(state => ({
  //   //   answerOptions: [],
  //   //   question: ''
  //   // }));
  //   return (
  //     <Game>
  //       <div><button onClick={this.renderModal}></button></div>
  //     </Game>
  //   )
  // }

  render() {
    // const { results } = this.state;
    // if (results.length === this.state.films.length) {
    //   console.log(results)
    //   // const congrats = results[0].map(res => <h3 className="congrats">{res}</h3>);
    //   // const sorry = results[1].map(res => <h3 className="sad-clown">{res}</h3>);

    //   return (
    //     <>
    //       <div><button onClick={e => this.openModal(e)}></button></div>

    //       <Modal show={this.state.isModalOpen} handleClose={e => this.closeModal(e)}>
    //         {/* {congrats}
    //         {sorry} */}
    //       </Modal>
    //     </>
    //   )
    // } else {
    //   console.log('meow')
    // }
    //console.log(this.state.answer)
    //console.log(this.state.question)
    //console.log(this.state.score)
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
        {/* <div><button onClick={e => this.openModal(e)}></button></div>

        <Modal show={this.state.isModalOpen} handleClose={e => this.closeModal(e)}>
          {[congrats, sorry]}

        </Modal> */}
        {/* {
          (this.state.questionId === this.films.length) ? <Modal /> : null
        } */}
      </div>
    )
  }
}

export default Container;