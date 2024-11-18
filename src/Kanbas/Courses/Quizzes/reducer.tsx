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
    // addAssignment: (state, { payload: assignment }) => {
    //   const newAssignment: any = {
    //     _id: new Date().getTime().toString(),
    //     title: assignment.title,
    //     description: assignment.description,
    //     points: assignment.points,
    //     due_date_num: assignment.due_date_num,
    //     available_date_num: assignment.available_date_num,
    //     course: assignment.course,
    //   };
    //   state.assignments = [...state.assignments, newAssignment] as any;
    // },
    // deleteAssignment: (state, { payload: assignmentId }) => {
    //   state.assignments = state.assignments.filter((a: any) => 
    //     a._id !== assignmentId);
    // },
    // updateAssignment: (state, { payload: assignment }) => {
    //   state.assignments = state.assignments.map((a: any) =>
    //     a._id === assignment._id ? assignment : a
    //   ) as any;
    // },
    // editAssignment: (state, { payload: assignmentId }) => {
    //   state.assignments = state.assignments.map((a: any) =>
    //     a._id === assignmentId ? { ...a } : a
    //   ) as any;
    // },
  },
});

export const { setQuizzes } =
  quizSlice.actions;
export default quizSlice.reducer;