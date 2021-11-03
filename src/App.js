import React, { Component } from 'react';
import { shuffleArray } from './shuffleArray';
import { movement } from './Movement';
import { checkFinish } from './checkFinish';
import { scoreCard } from './scoreCard';
import Cell from './Cell';
import './App.css';

let mario_jump;
let items = [];
let max_mushroom;
let no_of_moves;

class App extends Component {
  constructor(props) {
    super(props);   

    let width = prompt('Please enter board width');
    let height = prompt('Please enter board height')
    let matrixSize = height * width;
    mario_jump = width;

    this.state = {
      matrixSize: matrixSize,
      width: width,
      height: height
    }
  }

  componentDidMount() {
    window.addEventListener('load', this.handleLoad(this.state.width, this.state.height));
    document.addEventListener('keydown', this.onKeyPress);
  }

  handleLoad(width, height) {
    let matrix = document.getElementById('root')
    matrix.style.height = 45 * height + "px"
    matrix.style.width = 45 * width + "px"
    let shuffled_data = shuffleArray(items)
    let truncated_data = shuffled_data.slice(0, Math.max(this.state.width, this.state.height))
    for (let i = 0; i < truncated_data.length; i++) {
      let elem_position = document.getElementById(truncated_data[i])
      elem_position.innerHTML = "<img src='Sprite.png' alt='mario' class='maze-image' />";
      elem_position.classList.toggle('active')
    }

    const unique_data = shuffled_data.filter((obj) => {
      return truncated_data.indexOf(obj) === -1;
    });

    let item = unique_data[Math.floor(Math.random() * unique_data.length)];
    let marioposition = document.getElementById(item)
    marioposition.classList.toggle('mario')
    marioposition.innerHTML = "<img src='Mario.png' alt='mario' class='maze-image' />";
    max_mushroom = document.getElementsByClassName('active').length
  }

  onKeyPress(event) {
    if (event.keyCode !== undefined) {
      if (no_of_moves === undefined) {
        no_of_moves = 0
      }
      no_of_moves = no_of_moves + 1;
    }

    movement(event, mario_jump, no_of_moves);
    checkFinish(no_of_moves);
    scoreCard(no_of_moves, max_mushroom);
  }

  render() {
    return (
      <div className="App">
        <Box matrix={this.state.matrixSize} />
        <Score />
      </div>
    );
  }
}

class Score extends Component {
  constructor(props) {
    super(props)
    this.state = {
      score: 0
    }
  }
  render() {
    return (
      <div id="score">
        <div>
          <p style={{ fontWeight: "bold", fontSize: 20 }}> Score Achieved </p> <p id="score_achieved" style={{ fontSize: 20 }}> 0 </p> </div> <div >
          <p style={{ fontWeight: "bold", fontSize: 20 }}> Steps Used </p> <p id="no_of_moves" style={{ fontSize: 20 }}> 0 </p> </div> <div >
          <p style={{ fontWeight: "bold", fontSize: 20 }}> Remaining sprites </p> <p id="mashrooms_remaining" style={{ fontSize: 20 }}> 0 </p> </div> </div>
    )
  }
}

class Box extends Component {
  constructor(props) {
    super(props)
    let c = [];
    let i;
    for (i = 1; i <= this.props.matrix; i++) {
      c.push(<Cell key={i} id={i} cells={c} />)
      items.push(i)
    }

    this.state = {
      cells: c
    }
  }
  render() {
    return (
      <div> 
        {this.state.cells}
      </div>
    )
  }
}

export default App;