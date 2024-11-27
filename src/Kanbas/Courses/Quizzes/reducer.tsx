import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [],
};
const quizSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, { payload: quiz }) => {
      const newQuiz: any = {
        _id: new Date().getTime().toString(),
        title: quiz.title,
        description: quiz.description,
        points: quiz.points,
        due_date_num: quiz.due_date_num,
        available_date_num: quiz.available_date_num,
        course: quiz.course,
      };
      state.quizzes = [...state.quizzes, newQuiz] as any;
    },
    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter((q: any) => 
        q._id !== quizId);
    },
    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quiz._id ? quiz : q
      ) as any;
    },
    // editAssignment: (state, { payload: assignmentId }) => {
    //   state.assignments = state.assignments.map((a: any) =>
    //     a._id === assignmentId ? { ...a } : a
    //   ) as any;
    // },
  },
});

export const { addQuiz, deleteQuiz, updateQuiz, setQuizzes } =
  quizSlice.actions;
export default quizSlice.reducer;