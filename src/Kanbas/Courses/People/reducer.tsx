import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enrollments: [],
};

const peopleSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setPeople: (state, action) => {
      state.enrollments = action.payload;
    },
    addPerson: (state, { payload: people }) => {
        // const newPerson: any = {
        //   _id: new Date().getTime().toString(),
        //   user: person.name,
        //   course: person.course,
        // };
        state.enrollments = [...state.enrollments, people] as any;
        setPeople(state.enrollments);
    },
    deletePerson: (state, { payload: unenroll }) => {
      state.enrollments = state.enrollments.filter(
        (enrollment: any) => enrollment.course !== unenroll.course || enrollment.user !== unenroll.user
      ); //why does it not work without 'any'
      setPeople(state.enrollments);
      // state.enrollments = state.enrollments.filter(
      //   (m: any) => m._id !== personId);
    },
  },
});


export const {  setPeople, addPerson, deletePerson } =
  peopleSlice.actions;
export default peopleSlice.reducer;