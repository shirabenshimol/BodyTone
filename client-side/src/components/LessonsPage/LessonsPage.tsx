import React, { useEffect, useMemo, useState } from "react";
import { Box, Typography, Paper, Container } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../redux/hooks";

// ---- הגדרת בסיס ה-API מתוך .env (CRA) ----
const API_BASE =
  process.env.REACT_APP_API_BASE || "http://localhost:8080";

// ---- טיפוסים ----
interface Lesson {
  id: number;
  name: string;        // דוגמה: "Yoga - Beginners"
  date: string;        // "YYYY-MM-DD" (LocalDate)
  time: string;        // "HH:mm:ss" (LocalTime)
  maxCapacity: number;
  femaleOnly: boolean;
}

interface LessonHistoryRow {
  lessonId?: number;           // אם ה-DTO מחזיר מזהה בלבד
  lesson?: { id: number };     // אם ה-DTO מחזיר אובייקט lesson
}

// ---- תצוגה ----
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const times = [
  "06:00", "07:30", "09:00", "10:30", "12:00",
  "15:00", "17:00", "18:30"
];

const getColorByType = (name: string) => {
  if (name.includes("HIIT")) return "#264640";
  if (name.includes("Yoga")) return "#33465c";
  if (name.includes("Pilates")) return "#3d345e";
  if (name.includes("Zumba")) return "#6e4d3c";
  if (name.includes("CrossFit")) return "#5d3a43";
  return "#101827";
};

const LessonsPage: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [myRegistrations, setMyRegistrations] = useState<number[]>([]);
  const [hoveredLessonId, setHoveredLessonId] = useState<number | null>(null);

  const token = localStorage.getItem("token");
  const user = useAppSelector(state => state.user.user);
  const userId = user?.code;


  
  const isRegistered = (lessonId: number) => myRegistrations.includes(lessonId);

  // ---- טעינת נתונים ----
  useEffect(() => {
    // 1) כל השיעורים
    fetch(`${API_BASE}/Lessons/getAll`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch lessons");
        return res.json();
      })
      .then((data: Lesson[]) => setLessons(data))
      .catch((err) => {
        console.error("Failed to load lessons:", err);
        toast.error("טעינת שיעורים נכשלה");
      });

    // 2) ההרשמות שלי (אם מחוברת עם userId + token)
    if (userId && token) {
      fetch(`${API_BASE}/LessonRegistration/getByUser/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(async (res) => {
          if (!res.ok) {
            const msg = await res.text();
            console.warn("Failed to load registrations:", msg);
            return [];
          }
          return res.json();
        })
        .then((rows: LessonHistoryRow[]) => {
          const ids = rows
            .map((r) => r.lesson?.id ?? r.lessonId)
            .filter((x): x is number => typeof x === "number");
          setMyRegistrations(ids);
        })
        .catch((err) => console.error("Failed to load registrations", err));
    }
  }, [userId, token]);

  // ---- עזר למציאת שיעור לפי יום/שעה ----
  const getLesson = (dayIndex: number, time: string) => {
    return lessons.find((lesson) => {
      // JS: Sunday=0 ... Saturday=6 | אצלך days מתחיל ב-Sunday=0, תואם
      const lessonDay = new Date(lesson.date + "T00:00:00").getDay();
      const hhmm = (lesson.time || "").slice(0, 5); // "HH:mm"
      return lessonDay === dayIndex && hhmm === time;
    });
  };

  // ---- הרשמה ----
  const handleRegister = async (lessonId: number) => {
    if (!userId || !token) {
      toast.warning("עליך להתחבר לפני ההרשמה");
      return;
    }

    if (isRegistered(lessonId)) {
      toast.info("כבר רשומה לשיעור הזה");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/LessonRegistration/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: Number(userId),
          lessonId,
          joinedAt: new Date().toISOString(),
          status: "REGISTERED",
        }),
      });

      if (!res.ok) throw new Error(await res.text());

      setMyRegistrations((prev) => [...prev, lessonId]);
      toast.success("נרשמת בהצלחה 🎉");
    } catch (err) {
      console.error(err);
      toast.error("הרשמה נכשלה");
    }
  };

  return (
    <Box sx={{ background: "#0f172a", minHeight: "100vh", py: 6 }}>
      <Typography
        variant="h4"
        mb={1}
        sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}
      >
        Class Schedule
      </Typography>
      <Typography
        variant="subtitle1"
        mb={4}
        sx={{ color: "#94a3b8", textAlign: "center" }}
      >
        Find the perfect class for your fitness journey
      </Typography>

      <Container
        maxWidth="lg"
        sx={{ backgroundColor: "#1e293b", borderRadius: 4, p: 4 }}
      >
        <Box display="grid" gridTemplateColumns="100px repeat(6, 1fr)" gap={1}>
          <Box />
          {days.map((day) => (
            <Typography
              key={day}
              align="center"
              sx={{ color: "white", fontWeight: "bold" }}
            >
              {day}
            </Typography>
          ))}

          {times.map((time) => (
            <React.Fragment key={time}>
              <Typography sx={{ color: "#10b981", fontWeight: "bold" }}>
                {time}
              </Typography>

              {days.map((_, dayIndex) => {
                const lesson = getLesson(dayIndex, time);

                return (
                  <Paper
                    key={`${dayIndex}-${time}`}
                    elevation={3}
                    sx={{
                      height: 60,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: lesson
                        ? getColorByType(lesson.name)
                        : "#1e293b",
                      color: "white",
                      fontWeight: "bold",
                      borderRadius: 3,
                      fontSize: 13,
                      textAlign: "center",
                      px: 1,
                      cursor: lesson ? "pointer" : "default",
                      transition: "0.2s",
                      "&:hover": {
                        backgroundColor: lesson ? "#334155" : "#1e293b",
                      },
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
                            הרשמה לשיעור
                          </Typography>
                        ) : (
                          <>
                            <div>{lesson.name.split(" - ")[0]}</div>
                            <div style={{ fontWeight: 400, fontSize: 12 }}>
                              {lesson.name.split(" - ")[1] ?? ""}
                            </div>
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

      <ToastContainer position="bottom-center" theme="dark" />
    </Box>
  );
};

export default LessonsPage;
