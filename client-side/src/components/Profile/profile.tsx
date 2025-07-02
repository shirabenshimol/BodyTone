import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Avatar,
  Divider,
  Chip
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState({
    name: 'Shira Ben Shimol',
    email: 'shira@example.com',
    membership: 'Gold'
  });

  type LessonHistoryItem = {
    lessonId: number;
    title: string;
    date: string;
    time: string;
    status: string; // "ATTENDED", "REGISTERED", "CANCELED"
    image: string;
  };

  const [lessonHistory, setLessonHistory] = useState<LessonHistoryItem[]>([]);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchLessonHistory = async () => {
      if (!userId || !token) return;
      try {
        const response = await fetch(`http://localhost:8080/LessonRegistration/getByUser/${userId}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error("Failed to fetch lesson history");

        const data: LessonHistoryItem[] = await response.json();

        const mappedData = data.map(item => ({
          ...item,
          image: item.title.toLowerCase().includes("yoga")
            ? "/images/image (11).png"
            : item.title.toLowerCase().includes("boxing")
            ? "/images/image (12).png"
            : item.title.toLowerCase().includes("hiit")
            ? "/images/eduardo-cano-photo-co-9xL_8KCEQqE-unsplash.jpg"
            : item.title.toLowerCase().includes("pilates")
            ? "/images/image (13).png"
            : "/images/akram-huseyn-7OkRyAxHUd8-unsplash.jpg"
            
        }));

        setLessonHistory(mappedData);
      } catch (error) {
        console.error("Error fetching lesson history:", error);
      }
    };

    fetchLessonHistory();
  }, []);

  const handleCancel = async (lessonId: number) => {
    if (!userId || !token) return;

    try {
      const response = await fetch(`http://localhost:8080/LessonRegistration/delete/${lessonId}/${userId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error("Failed to cancel lesson");

      setLessonHistory(prev => prev.filter(l => l.lessonId !== lessonId));
    } catch (error) {
      console.error("Error cancelling lesson:", error);
    }
  };

  return (
    <Box sx={{ bgcolor: '#0f172a', color: 'white', minHeight: '100vh', py: 5, px: { xs: 2, md: 6 } }}>
      <Typography variant="h4" fontWeight="bold" color="#00C896" gutterBottom>
        Welcome, {user.name}!
      </Typography>

      <Grid container spacing={4}>
        {/* Profile */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 4, bgcolor: '#1e293b', borderRadius: 3 }}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Avatar sx={{ width: 90, height: 90, bgcolor: '#00C896', fontSize: 32, mb: 2 }}>
                {user.name.charAt(0)}
              </Avatar>
              <Typography variant="h6" fontWeight="bold">{user.name}</Typography>
              <Typography variant="body2" color="gray">{user.email}</Typography>
              <Chip label={`Membership: ${user.membership}`} color="success" sx={{ mt: 2 }} />
            </Box>
          </Paper>
        </Grid>

        {/* Stats */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            {[
              { label: 'Total Lessons', value: lessonHistory.length.toString() },
              { label: 'Hours Trained', value: '8' },
              { label: 'Calories Burned', value: '3,500' }
            ].map((stat, i) => (
              <Grid item xs={12} sm={4} key={i}>
                <Paper elevation={3} sx={{ p: 3, textAlign: 'center', bgcolor: '#1e293b', borderRadius: 3 }}>
                  <Typography variant="h5" fontWeight="bold" color="#00C896">{stat.value}</Typography>
                  <Typography variant="body2" color="#cbd5e1">{stat.label}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Lesson History */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>Lesson History</Typography>
          <Divider sx={{ mb: 3, borderColor: '#00C896' }} />
          {lessonHistory.map(lesson => (
            <Paper
              key={lesson.lessonId}
              elevation={2}
              sx={{ display: 'flex', mb: 2, bgcolor: '#1f2937', borderRadius: 2, overflow: 'hidden' }}
            >
              {/* Image */}
              <Box sx={{ width: 100, height: 100 }}>
                <img
                  src={lesson.image}
                  alt={lesson.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>

              {/* Info + Buttons */}
              <Box sx={{ flex: 1, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold" color="white">
                    {lesson.title}
                  </Typography>
                  <Typography variant="body2" color="gray">
                    {lesson.date} | {lesson.time}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  {lesson.status === "ATTENDED" && (
                    <Chip icon={<CheckCircleIcon />} label="Attended" color="success" />
                  )}
                  {lesson.status === "CANCELED" && (
                    <Chip icon={<CancelIcon />} label="Canceled" color="error" />
                  )}
                  {lesson.status === "REGISTERED" && (
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<CancelIcon />}
                      onClick={() => handleCancel(lesson.lessonId)}
                    >
                      Cancel
                    </Button>
                  )}
                </Box>
              </Box>
            </Paper>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
