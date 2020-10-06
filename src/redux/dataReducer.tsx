const initialState = {
     id : 0,
     questions: [],
     attemptedQuestions: []
 };
 
 const dataReducer = (state: any = initialState, action: any) => {
    switch(action.type) {
        case "INCREMENT":
            return { ...state,id:action.payload };
        case "LOADQUESTIONS":
            return { ...state,questions: action.payload};
        case "ATTEMPTEDQUESTION":
            let isExist = state.attemptedQuestions.filter((opt: any) => opt.id === action.payload.id);
            if (isExist.length) {
                let updatedOptions = state.attemptedQuestions.map((opt: any) => {
                    if(opt.id === action.payload.id) {
                        opt.selectedOption = action.payload.selectedOption;
                        opt.correctOption = action.payload.correctOption;
                    }
                    return opt;
                })
                return { ...state,attemptedQuestions: updatedOptions};
            }
            let updatedVal = [...state.attemptedQuestions,{...action.payload}]
            return { ...state,attemptedQuestions: updatedVal};
        case "RESETTEST":
            return {...state, ...initialState};
        default:
            return state;
    }
}

export default dataReducer;