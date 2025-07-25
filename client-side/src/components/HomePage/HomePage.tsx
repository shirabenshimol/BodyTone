import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        background: 'linear-gradient(to bottom right, #0f172a, #1e293b)',
        color: 'white',
        minHeight: '100vh',
        px: 4,
        pt: 12,
      }}
    >
      <Grid container justifyContent="flex-start" alignItems="center" spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h2" fontWeight="bold" sx={{ mb: 2, lineHeight: 1.2 }}>
            <Box component="span" sx={{ color: '#10b981' }}>Body</Box>,<br />
            Transform Your <br />
            <Box component="span" sx={{ color: '#10b981' }}>Life</Box>
          </Typography>

          <Typography variant="h6" sx={{ mb: 4 }}>
            Join thousands who've achieved their fitness goals with our expert trainers and cutting-edge equipment.
          </Typography>

          {/* שורת כפתורים + תיבה מימין */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#10b981',
                fontWeight: 'bold',
                px: 3,
                py: 1.5,
                borderRadius: 2,
                '&:hover': { backgroundColor: '#0ea971' },
              }}
              onClick={() => navigate('/membershipPlans')}>
              Start Your Journey
            </Button>

            <Button
              variant="outlined"
              sx={{
                color: 'white',
                borderColor: 'white',
                fontWeight: 'bold',
                px: 3,
                py: 1.5,
                borderRadius: 2,
                '&:hover': {
                  borderColor: '#10b981',
                  color: '#10b981',
                },
              }}
              onClick={() => navigate('/classes')}
            >
              View Classes
            </Button>

            <Card
              sx={{
                width: 120,
                backgroundColor: '#10b981',
                color: 'white',
                borderRadius: 2,
              }}
            >
              <CardContent sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="h5" fontWeight="bold">500+</Typography>
                <Typography variant="body2">Members</Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
