import * as React from 'react';
import { connect } from "react-redux";

const ResultComponent = (state: any) => {
    let totalQuestions = state.examState.questions;
    let attemptedQuestions = state.examState.attemptedQuestions;
    let resultView = totalQuestions.map((question: any) => {
        let correctOption = question.options.filter((opt: any) =>  opt.id === question.correctOptions);
        let isAttempted = attemptedQuestions.filter((opt: any) => opt.id === question.id);
        let attemptedText = '';
        if(isAttempted.length !== 0) {
            question.isCorrect = isAttempted[0].selectedOption === correctOption[0].id;
            attemptedText = question.options.filter((opt: any) =>  opt.id === isAttempted[0].id)[0].text;
        }
        debugger
        return {...question,correctAnswer:correctOption[0].text,attemptedText:attemptedText};
    });
    console.log(resultView);
    return (
        <div>
            <div className="row p-1">
                <table className="table table-dark">
                <thead>
                <tr>
                    <th>Question</th>
                    <th>Correct Answer</th>
                    <th>Selected Answer</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
        {resultView.map((question: any) => {
            return (
                <tr  key={question.id}>
                    <td>{question.header}</td>
                    <td>{question.correctAnswer}</td>
                    <td>{question.attemptedText ? question.attemptedText: '-'}</td>
                    <td>{!question.attemptedText ? "Not Attempted" :
                     question.isCorrect ? "Correct" : "Incorrect"}</td>
                </tr>
            )
        })}
        </tbody>
        </table>
        </div>
        </div>
    )
} 

const mapStateToProps = (state: any) => {
    return {
      examState: state
    }
  }

  export default connect(mapStateToProps)(ResultComponent);
