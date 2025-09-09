import React, { useEffect, useState, useMemo } from 'react';
import {
  Box, Typography, Grid, Paper, Button, Avatar, Divider, Chip,
  MenuItem, Select, FormControl, InputLabel, TextField,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAppSelector } from '../../redux/hooks';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateUser } from '../../redux/slices/userSlice';
import { useDispatch } from 'react-redux';

const API_BASE =
  process.env.REACT_APP_API_BASE || "http://localhost:8080";


const ProfilePage: React.FC = () => {
 
  const dispatch = useDispatch();

  type LessonHistoryItem = {
    lessonId: number;
    title: string;
    date: string;
    time: string;
    status: string;
    image: string;
  };

  const [lessonHistory, setLessonHistory] = useState<LessonHistoryItem[]>([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  
  const token = localStorage.getItem("token");
  const user = useAppSelector(state => state.user.user);
  const userId = user?.code;


  useEffect(() => {
    if (user) {
      setEditData({
        code: user.code,
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        birthDate: user.birthDate || ''
      });
    }
  }, [user]);

  useEffect(() => {
    const fetchLessonHistory = async () => {
      if (!userId || !token) return;
      try {
        const response = await fetch(`${API_BASE}/LessonRegistration/getByUser/${userId}`, {
          headers: { "Authorization": `Bearer ${token}` }
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

  const filteredLessons = useMemo(() => {
    let filtered = lessonHistory;
    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(l => l.status === statusFilter);
    }
    if (typeFilter !== 'ALL') {
      filtered = filtered.filter(l => l.title.toLowerCase().includes(typeFilter.toLowerCase()));
    }
    return filtered;
  }, [statusFilter, typeFilter, lessonHistory]);

  useEffect(() => {
    setVisibleCount(5);
  }, [statusFilter, typeFilter]);

  const handleCancel = async (lessonId: number) => {
    if (!userId || !token) return;
    try {
      const response = await fetch(`${API_BASE}/LessonRegistration/delete/${lessonId}/${userId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (!response.ok) throw new Error("Failed to cancel lesson");

      setLessonHistory(prev => prev.filter(l => l.lessonId !== lessonId));
      toast.success("Lesson canceled!");
    } catch (error) {
      console.error("Error cancelling lesson:", error);
      toast.error("Failed to cancel lesson.");
    }
  };

  const handleSaveEdit = async () => {
    try {
      if (!editData?.code) {
        toast.error("User ID missing. Cannot update.");
        return;
      }

      const response = await fetch(`${API_BASE}/Users/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editData)
      });

      if (!response.ok) throw new Error("Update failed");
      dispatch(updateUser(editData));
      toast.success("Profile updated successfully!");
      
      setEditMode(false);
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Failed to update profile.");
    }
  };

  const visibleLessons = filteredLessons.slice(0, visibleCount);

  if (!user) {
    return (
      <Box sx={{ color: 'white', textAlign: 'center', mt: 10 }}>
        <Typography variant="h6">User not found. Please log in.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: '#0f172a', color: 'white', minHeight: '100vh', py: 5, px: { xs: 2, md: 6 } }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 4, bgcolor: '#1e293b', borderRadius: 3 }}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Avatar sx={{ width: 90, height: 90, bgcolor: '#00C896', fontSize: 32, mb: 2 }}>
                {user.name?.charAt(0) || ''}
              </Avatar>
              <Typography variant="h6" fontWeight="bold" color="white">{user.name}</Typography>
              <Typography variant="body2" color="gray">{user.email}</Typography>
              <Chip label={`Membership: ${user.membership}`} color="success" sx={{ mt: 2 }} />
              <Button variant="outlined" sx={{ mt: 2, color: 'white', borderColor: 'white' }} onClick={() => setEditMode(true)}>
                Edit Profile
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            {[{ label: 'Total Lessons', value: lessonHistory.length.toString() }, { label: 'Hours Trained', value: '8' }, { label: 'Calories Burned', value: '3,500' }].map((stat, i) => (
              <Grid item xs={12} sm={4} key={i}>
                <Paper elevation={3} sx={{ p: 3, textAlign: 'center', bgcolor: '#1e293b', borderRadius: 3 }}>
                  <Typography variant="h5" fontWeight="bold" color="#00C896">{stat.value}</Typography>
                  <Typography variant="body2" color="#cbd5e1">{stat.label}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" gap={2} mb={2}>
            <FormControl variant="filled" sx={{ minWidth: 150 }}>
              <InputLabel sx={{ color: '#ccc' }}>Status</InputLabel>
              <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} sx={{ color: 'white' }}>
                <MenuItem value="ALL">All</MenuItem>
                <MenuItem value="REGISTERED">Registered</MenuItem>
                <MenuItem value="ATTENDED">Attended</MenuItem>
                <MenuItem value="CANCELED">Canceled</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="filled" sx={{ minWidth: 150 }}>
              <InputLabel sx={{ color: '#ccc' }}>Workout Type</InputLabel>
              <Select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} sx={{ color: 'white' }}>
                <MenuItem value="ALL">All</MenuItem>
                <MenuItem value="yoga">Yoga</MenuItem>
                <MenuItem value="boxing">Boxing</MenuItem>
                <MenuItem value="hiit">HIIT</MenuItem>
                <MenuItem value="pilates">Pilates</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>Lesson History</Typography>
          <Divider sx={{ mb: 3, borderColor: '#00C896' }} />
          {visibleLessons.map(lesson => (
            <Paper key={lesson.lessonId} elevation={2} sx={{ display: 'flex', mb: 2, bgcolor: '#1f2937', borderRadius: 2, overflow: 'hidden' }}>
              <Box sx={{ width: 100, height: 100 }}>
                <img src={lesson.image} alt={lesson.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>
              <Box sx={{ flex: 1, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold" color="white">{lesson.title}</Typography>
                  <Typography variant="body2" color="gray">{lesson.date} | {lesson.time}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  {lesson.status === "ATTENDED" && <Chip icon={<CheckCircleIcon />} label="Attended" color="success" />}
                  {lesson.status === "CANCELED" && <Chip icon={<CancelIcon />} label="Canceled" color="error" />}
                  {lesson.status === "REGISTERED" &&
                    <Button variant="outlined" color="error" startIcon={<CancelIcon />} onClick={() => handleCancel(lesson.lessonId)}>
                      Cancel
                    </Button>}
                </Box>
              </Box>
            </Paper>
          ))}
          {visibleCount < filteredLessons.length && (
            <Box textAlign="center" mt={2}>
              <Button variant="outlined" sx={{ color: '#00C896', borderColor: '#00C896' }} onClick={() => setVisibleCount(prev => prev + 5)}>
                Load More
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>

      <Dialog open={editMode} onClose={() => setEditMode(false)}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          {editData && ['name', 'email', 'phone', 'address', 'birthDate'].map(field => (
            <TextField
              key={field}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              fullWidth
              margin="dense"
              variant="filled"
              value={editData[field] || ''}
              onChange={(e) => setEditData({ ...editData, [field]: e.target.value })}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditMode(false)}>Cancel</Button>
          <Button onClick={handleSaveEdit} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      <ToastContainer position="bottom-center" theme="dark" />
    </Box>
  );
};

export default ProfilePage;
