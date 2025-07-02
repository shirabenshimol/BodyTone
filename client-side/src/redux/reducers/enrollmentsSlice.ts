import { createSlice } from "@reduxjs/toolkit";

export interface Enrollment {
  id: number;
  name: string;
  date: string;  // אפשר גם Date אם תרצה, אבל אז צריך המרה
  time: string;
  status: string;
}

export interface EnrollmentsState {
  enrollments: Enrollment[];
}

const initialState: EnrollmentsState = {
  enrollments: [],
};

export const enrollmentsSlice = createSlice({
  name: 'enrollments',
  initialState,
  reducers: {
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
    },
    addEnrollment: (state, action) => {
      state.enrollments.push(action.payload);
    },
    clearEnrollments: (state) => {
      state.enrollments = [];
    }
  }
});

export const { setEnrollments, addEnrollment, clearEnrollments } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
