import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Container } from '@mui/material';

interface Lesson {
  id: number;
  name: string;
  date: string;
  time: string;
  maxCapacity: number;
  femaleOnly: boolean;
}

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const times = [
  '06:00', '07:30', '09:00', '10:30', '12:00',
  '15:00', '17:00', '18:30'
];

const getColorByType = (name: string) => {
  if (name.includes('HIIT')) return '#264640';
  if (name.includes('Yoga')) return '#33465c';
  if (name.includes('Pilates')) return '#3d345e';
  if (name.includes('Zumba')) return '#6e4d3c';
  if (name.includes('CrossFit')) return '#5d3a43';
  return '#101827';
};

const LessonsPage: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [hoveredLessonId, setHoveredLessonId] = useState<number | null>(null);
  const [myRegistrations, setMyRegistrations] = useState<number[]>([]);

  const isRegistered = (lessonId: number) => myRegistrations.includes(lessonId);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    // Load lessons
    fetch('http://localhost:8080/Lessons/getAll')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch lessons');
        return res.json();
      })
      .then((data) => setLessons(data))
      .catch((err) => console.error('Failed to load lessons:', err));

    // Load user's registrations
    if (userId && token) {
      fetch(`http://localhost:8080/LessonRegistration/byUser/${userId}`, {
        headers: { Authorization: "Bearer " + token }
      })
        .then(res => res.json())
        .then(data => {
          const ids = data.map((r: any) => r.lesson.id);
          setMyRegistrations(ids);
        })
        .catch(err => console.error("Failed to load registrations", err));
    }
  }, []);

  const getLesson = (dayIndex: number, time: string) => {
    return lessons.find((lesson) => {
      const lessonDate = new Date(lesson.date);
      const lessonDay = lessonDate.getDay(); // Sunday = 0
      const lessonTime = lesson.time.slice(0, 5); // 'HH:mm'
      return lessonDay === dayIndex && lessonTime === time;
    });
  };

  const handleRegister = async (lessonId: number) => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) return alert("עליך להתחבר לפני ההרשמה");
    if (isRegistered(lessonId)) return alert("כבר נרשמת לשיעור הזה");

    try {
      const response = await fetch("http://localhost:8080/LessonRegistration/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
          userId: Number(userId),
          lessonId,
          joinedAt: new Date().toISOString(),
          status: "REGISTERED"
        })
      });

      if (!response.ok) throw new Error("Registration failed");

      setMyRegistrations(prev => [...prev, lessonId]); // עדכון סטייט
      alert("נרשמת בהצלחה 🎉");

    } catch (err) {
      console.error(err);
      alert("שגיאה בהרשמה לשיעור");
    }
  };

  return (
    <Box sx={{ background: '#0f172a', minHeight: '100vh', py: 6 }}>
      <Typography variant="h4" mb={1} sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
        Class Schedule
      </Typography>
      <Typography variant="subtitle1" mb={4} sx={{ color: '#94a3b8', textAlign: 'center' }}>
        Find the perfect class for your fitness journey
      </Typography>
      <Container maxWidth="lg" sx={{ backgroundColor: '#1e293b', borderRadius: 4, p: 4 }}>
        <Box display="grid" gridTemplateColumns="100px repeat(6, 1fr)" gap={1}>
          <Box />
          {days.map((day) => (
            <Typography key={day} align="center" sx={{ color: 'white', fontWeight: 'bold' }}>
              {day}
            </Typography>
          ))}

          {times.map((time) => (
            <React.Fragment key={time}>
              <Typography sx={{ color: '#10b981', fontWeight: 'bold' }}>{time}</Typography>
              {days.map((_, dayIndex) => {
                const lesson = getLesson(dayIndex, time);
                return (
                  <Paper
                    key={`${dayIndex}-${time}`}
                    elevation={3}
                    sx={{
                      height: 60,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: lesson ? getColorByType(lesson.name) : '#1e293b',
                      color: 'white',
                      fontWeight: 'bold',
                      borderRadius: 3,
                      fontSize: 13,
                      textAlign: 'center',
                      px: 1,
                      cursor: lesson ? 'pointer' : 'default',
                      transition: '0.2s',
                      '&:hover': {
                        backgroundColor: lesson ? '#334155' : '#1e293b',
                      }
                    }}
                    onClick={() => lesson && handleRegister(lesson.id)}
                    onMouseEnter={() => lesson && setHoveredLessonId(lesson.id)}
                    onMouseLeave={() => setHoveredLessonId(null)}
                  >
                    {lesson && (
                      <Box textAlign="center">
                        {isRegistered(lesson.id) ? (
                          <Typography fontSize={12} fontWeight="bold" color="#94a3b8">
                            Already Registered
                          </Typography>
                        ) : hoveredLessonId === lesson.id ? (
                          <Typography fontSize={12} fontWeight="bold" color="#10b981">
                            הרשם לשיעור
                          </Typography>
                        ) : (
                          <>
                            <div>{lesson.name.split(' - ')[0]}</div>
                            <div style={{ fontWeight: 400, fontSize: 12 }}>{lesson.name.split(' - ')[1]}</div>
                          </>
                        )}
                      </Box>
                    )}
                  </Paper>
                );
              })}
            </React.Fragment>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default LessonsPage;
