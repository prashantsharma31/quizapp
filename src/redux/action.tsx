import questionList from "../question.json";

export const increment = (id: number) => ({type: "INCREMENT",payload: id});

export const questionsList = () => ({type: "LOADQUESTIONS",payload: questionList.questions});

export const attemptedQuestions = (attemptedQuestion: any) => ({type: "ATTEMPTEDQUESTION",payload: attemptedQuestion});

export const resetTest = () => ({type: "RESETTEST"});
