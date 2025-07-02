import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Enrollment {
  userId: string;
  className: string;
  date: string; // תאריך בפורמט ISO
  status: 'registered' | 'cancelled' | 'pending'; // אפשר להוסיף עוד סטטוסים לפי הצורך
}

interface EnrollmentState {
  enrollments: Enrollment[];
}

const initialState: EnrollmentState = {
  enrollments: []
};

const enrollmentSlice = createSlice({
  name: 'enrollment',
  initialState,
  reducers: {
    addEnrollment: (state, action: PayloadAction<Enrollment>) => {
      // מוסיף הרשמה חדשה
      state.enrollments.push(action.payload);
    },
    updateEnrollmentStatus: (state, action: PayloadAction<{ userId: string; className: string; date: string; status: Enrollment['status'] }>) => {
      // מוצא הרשמה לפי userId, className ותאריך ומשנה סטטוס
      const { userId, className, date, status } = action.payload;
      const enrollment = state.enrollments.find(e =>
        e.userId === userId &&
        e.className === className &&
        e.date === date
      );
      if (enrollment) {
        enrollment.status = status;
      }
    },
    removeEnrollment: (state, action: PayloadAction<{ userId: string; className: string; date: string }>) => {
      // מסיר הרשמה לפי userId, className ותאריך
      state.enrollments = state.enrollments.filter(e =>
        !(e.userId === action.payload.userId &&
          e.className === action.payload.className &&
          e.date === action.payload.date)
      );
    },
    clearEnrollments: (state) => {
      // מנקה את כל ההרשמות (לדוגמה בכניסה חדשה לאתר)
      state.enrollments = [];
    }
  }
});

export const { addEnrollment, updateEnrollmentStatus, removeEnrollment, clearEnrollments } = enrollmentSlice.actions;

export default enrollmentSlice.reducer;
