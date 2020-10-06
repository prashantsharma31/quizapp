import React, { useState, useEffect } from 'react';

export const QuestionComponent = (props: any) => {
    let { question, handelClick, attemptedQuestions,handelNextClick }  = props;
    
    let selectionObj = {id: 0,selectedOption: 0,correctOption: 0}
    let [selection, setSection] = useState(selectionObj);

    const optionClick = (id: number,selectedOption: number,correctOption: number) => {
        setSection({id,selectedOption,correctOption});
    }
    useEffect(() => {
        if(attemptedQuestions && attemptedQuestions.id) {
            setSection({id: question.id,selectedOption: attemptedQuestions.selectedOption,
                correctOption: attemptedQuestions.correctOption});
        }
      },[attemptedQuestions]);

    const submit = () => {
        handelClick(question.id,selection.selectedOption,selection.correctOption);
    }
    return (
    <div className="col-12" id={question.id}>
       
        <h2 className="col-12 text-left">{question.header}</h2>
        {
        question.options && question.options.map((option: any) => 
             {
                 return <div className="col-12 " key={option.id}>
                 <label className={(option.id === selection.selectedOption && question.id === selection.id) ?
                        "text-left btn-block btn btn-primary":
                        "text-left btn-block btn bg-light text-primary btn-outline-primary"    
                    }>
                 <input
                   type="radio"
                   value={option.id}
                   style={{display: "none"}}
                   name={question.id+"optionGroup"}
                   checked = {(option.id === selection.selectedOption && question.id === selection.id)}  
                   onChange= {(e) => optionClick(question.id,parseInt(e.target.value),question.correctOptions) }
                 /><span>{option.text}</span>
                 </label>
                 
             </div>
             }
        )}
        <div>
        <button className="btn btn-sm m-1 btn-primary" disabled={selection.selectedOption == 0} type="button" onClick= {()=> submit()}> Submit Answer</button>
        <button type="button" className="btn btn-sm m-1 btn-danger" onClick= {()=> handelNextClick()}> Skip Question </button>

        </div>
    </div>
    )
} 