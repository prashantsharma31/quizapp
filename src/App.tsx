import React, { Props } from 'react';
import logo from './logo.svg';
import './App.css';
import {HeaderComponent} from './components/Header';
import Timer from './components/TImer';
import {HomeComponent} from './components/Home';
import { Component } from 'react';
import * as actions from './redux/action';
import { connect } from "react-redux";
import {QuestionComponent} from './components/QuestionComponent';
import ResultComponent from './components/Result';

interface MyProps {
  examState: any,
  increment: any,
  questionsList: any,
  attemptedQuestions: any,
  resetTest: any;
}

interface MyState {
  currentQuestion: any,
  currentQuestionId: number,
  isQuestionAttempted: any,
  isStarted:boolean,
  isCompleted: boolean,
  showResult: boolean,
  timerValue: number;
}

class App extends Component<MyProps,MyState> {

    constructor(props: any){
      super(props);
      this.state = {currentQuestion: {},currentQuestionId: 0,isQuestionAttempted: {},isStarted: false,isCompleted: false, showResult: false,timerValue: 20};
    }

    componentDidMount() {
      this.props.questionsList();
    }

    static getDerivedStateFromProps(props: any, state: any) {
      if(props.examState)  {
        let currentQuestions =  props.examState.questions;
        if(currentQuestions && props.examState.id !== state.currentQuestionId) {
          let currentQuestion = currentQuestions.filter((quest: any) => quest.id === props.examState.id );
          let attemptedQues = {};
          if(props.examState.attemptedQuestions) {
            let alreadySelected = props.examState.attemptedQuestions.filter((quest: any) => quest.id === props.examState.id);
            attemptedQues = alreadySelected[0];
            return currentQuestion ? {currentQuestion: currentQuestion[0],currentQuestionId: props.examState.id,isQuestionAttempted: attemptedQues} : null;
          }
          return currentQuestion ? {currentQuestion: currentQuestion[0],currentQuestionId: props.examState.id} : null;
        }
      }
      return null;
    }

    handelNextClick() : any {
      let id = this.state.currentQuestionId;
      if(id < this.props.examState.questions.length) {
        this.props.increment(id+1);   
      } else {
        this.handelFinishClick();
      }
      if (id == 0) {
        this.setState((prevState, props) => ({
          isStarted: true
        }));
      }

      if (id >= this.props.examState.questions.length-1) {
        this.setState((prevState, props) => ({
          isCompleted: true
        }));
      }
    }

    handelPreviousClick() : any {
      let id = this.state.currentQuestionId;
      if(id > 1) {
        this.props.increment(id-1);   
        this.setState((prevState, props) => ({
          isCompleted: false
        }));
      }
    }

    handelClick = (id: number,selectedOption: number,correctOption: number) : any => {
      console.log('a');
      this.props.attemptedQuestions({id,selectedOption,correctOption})
    }
    
    handelFinishClick() : any {
      this.setState((prevState) => ({
        showResult: true
      }));
    }

    handelRetakeClick() : any {
      this.setState((prevState) => ({
        showResult: false,
        isCompleted: false
      }));
      this.props.resetTest();
      this.props.questionsList();
      this.props.increment(1);   
    }

  render() {
    let data = this.props;
    let isNextDisabled = data.examState &&  data.examState.attemptedQuestions.filter((opt: any) =>(opt.id === this.state.currentQuestion.id));
    console.log(isNextDisabled);
    return (
      <div className="App container-flux">
        <HeaderComponent header="Quick Assessment"/>
        {
          !this.state.isStarted && <HomeComponent/>
         }
        {
          !this.state.showResult ?
          <div>
            {
              this.state.isStarted ?
              <div className="row">
              
            {data && <div className="align-left pl-5 font-weight-bold">Question {data.examState.id} test <Timer clickHandler= {()=> this.handelNextClick()}
             duration={this.state.timerValue} id={this.state.currentQuestion.id}/></div>}
            {
              this.state.currentQuestion && 
              <QuestionComponent handelClick={this.handelClick} handelNextClick = {()=> this.handelNextClick()} key={this.state.currentQuestion.id} attemptedQuestions={this.state.isQuestionAttempted} question = {this.state.currentQuestion}/>
           }
           <div className="col-12 mt-3">
            {/* <button type="button" className="btn btn-sm btn-secondary m-1" onClick= {()=> this.handelPreviousClick()}> Previous </button> */}
            {
              this.state.isCompleted ?
              <button type="button" className="btn btn-sm btn-success m-1" onClick= {()=> this.handelFinishClick()}> Finish Test </button>:
              <button type="button" disabled={isNextDisabled.length == 0} className="btn btn-sm btn-success m-1" onClick= {()=> this.handelNextClick()}> Next </button>
            } 
           </div>
          </div> :
          <div>
            <button type="button" className="btn btn-primary" onClick= {()=> this.handelNextClick()}> Start Test </button>
          </div>
        }
          </div> :
          <div>
            <ResultComponent />
            <button type="button" className="btn btn-primary" onClick= {()=> this.handelRetakeClick()}> Retake Test </button>

          </div>
        }

      </div>
    );
  }
  
}
const mapStateToProps = (state: any) => {
  return {
    examState: state
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return({
    increment: (id: number) => dispatch(actions.increment(id)),
    questionsList: () => dispatch(actions.questionsList()),
    attemptedQuestions: (ques: any) => dispatch(actions.attemptedQuestions(ques)),
    resetTest: () => dispatch(actions.resetTest()),
  })
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
