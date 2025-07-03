// src/components/MembershipPlans.tsx
import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const plans = [
  {
    title: 'Basic',
    price: 29,
    features: ['Gym Access', 'Basic Equipment', 'Locker Room'],
    highlight: false,
  },
  {
    title: 'Premium',
    price: 59,
    features: [
      'All Basic Features',
      'Group Classes',
      'Personal Training',
      'Nutrition Plan',
    ],
    highlight: true,
    badge: 'Most Popular',
  },
  {
    title: 'Elite',
    price: 99,
    features: [
      'All Premium Features',
      '24/7 Access',
      'VIP Lounge',
      'Priority Booking',
    ],
    highlight: false,
  },
];

const MembershipPlans: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        bgcolor: '#1a1f2b',
        minHeight: '100vh',
        py: 8,
        px: 4,
        color: 'white',
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Membership Plans
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 5 }}>
        Choose the plan that fits your lifestyle
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {plans.map((plan, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                backgroundColor: '#252c3c',
                color: 'white',
                borderRadius: 3,
                border: plan.highlight ? '2px solid #00c291' : 'none',
                position: 'relative',
                height: '100%',
              }}
              elevation={plan.highlight ? 10 : 3}
            >
              {plan.badge && (
                <Chip
                  label={plan.badge}
                  color="success"
                  sx={{
                    position: 'absolute',
                    top: 16,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontWeight: 'bold',
                  }}
                />
              )}
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {plan.title}
                </Typography>
                <Typography variant="h4" color="#00c291" fontWeight="bold">
                  ${plan.price}
                </Typography>
                <Typography variant="subtitle2" color="gray" gutterBottom>
                  per month
                </Typography>

                <List>
                  {plan.features.map((feature, i) => (
                    <ListItem key={i} disablePadding>
                      <ListItemIcon>
                        <CheckCircleIcon sx={{ color: '#00c291' }} />
                      </ListItemIcon>
                      <ListItemText primary={feature} />
                    </ListItem>
                  ))}
                </List>

                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 2,
                    backgroundColor: plan.highlight ? '#00c291' : '#3c4457',
                    '&:hover': {
                      backgroundColor: plan.highlight ? '#00b080' : '#4b5367',
                    },
                    fontWeight: 'bold',
                    textTransform: 'none',
                  }}
                >
                  Choose Plan
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MembershipPlans;
