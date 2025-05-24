import React from 'react';
import styled from 'styled-components';
import { Typography } from '@mui/material';

const AboutContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const About = () => {
  return (
    <AboutContainer>
      <Typography variant="h5" gutterBottom>
        About
      </Typography>
      <Typography variant="body1" paragraph>
        This is a simple calendar application for managing your cosmetics.
      </Typography>
    </AboutContainer>
  );
};

export default About;