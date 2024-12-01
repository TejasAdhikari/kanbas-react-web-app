import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
};
const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    addQuestion: (state, { payload: question }) => {
      const newQuestion: any = {
        _id: new Date().getTime().toString(),
        description: question.description,
        points: question.points,
        quiz: question.quiz,
      };
      state.questions = [...state.questions, newQuestion] as any;
    },
    deleteQuuestion: (state, { payload: questionId }) => {
      state.questions = state.questions.filter((q: any) => 
        q._id !== questionId);
    },
    updateQuestion: (state, { payload: question }) => {
      state.questions = state.questions.map((q: any) =>
        q._id === question._id ? question : q
      ) as any;
    },
    // editAssignment: (state, { payload: assignmentId }) => {
    //   state.assignments = state.assignments.map((a: any) =>
    //     a._id === assignmentId ? { ...a } : a
    //   ) as any;
    // },
  },
});

export const { addQuestion, deleteQuuestion, updateQuestion, setQuestions } =
  questionSlice.actions;
export default questionSlice.reducer;