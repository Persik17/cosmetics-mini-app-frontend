import React from 'react';
import styled from 'styled-components';
import { Typography, Link } from '@mui/material';

const ProfileContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const Profile = () => {
  return (
    <ProfileContainer>
      <Typography variant="h5" gutterBottom>
        Profile
      </Typography>
      <Typography variant="body1" paragraph>
        Here you can find information about the app.
      </Typography>
      <Link href="#" target="_blank" rel="noopener noreferrer" style={{ display: 'block', marginBottom: '10px' }}>
        Privacy Policy
      </Link>
      <Link href="#" target="_blank" rel="noopener noreferrer">
        Terms and Conditions
      </Link>
    </ProfileContainer>
  );
};

export default Profile;