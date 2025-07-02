import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const UserLesson = () => {
  // גישה ל־enrollments מתוך ה־Redux
  const enrollments = useSelector((state: any) => state.enrollments.enrollments);
  const [nextClassMessage, setNextClassMessage] = useState('');

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // מוצא את השיעור שמתרחש מחר
    const nextClass = enrollments.find((enr: any) => {
      const classDate = new Date(enr.date);
      return classDate.toDateString() === tomorrow.toDateString();
    });

    if (nextClass) {
      setNextClassMessage(`יש לך שיעור ${nextClass.name} מחר ב-${nextClass.time}`);
    } else {
      setNextClassMessage('');
    }
  }, [enrollments]);

  return (
    <div>
      {nextClassMessage && (
        <div className="notification">
          {nextClassMessage}
        </div>
      )}
      {/* שאר דף המשתמש */}
    </div>
  );
};

export default UserLesson;
