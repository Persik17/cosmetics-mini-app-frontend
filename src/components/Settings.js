import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button
} from '@mui/material';

const SettingsContainer = styled.div`
  padding: 20px;
`;

const Settings = () => {
  const [theme, setTheme] = useState('light');
  const [notificationTime, setNotificationTime] = useState('09:00');

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
    // Implement theme change logic here (e.g., update a global state or context)
    // For Telegram Web Apps, you'd use Telegram.WebApp.themeParams
    console.log('Theme changed to:', event.target.value);
  };

  const handleTimeChange = (event) => {
    setNotificationTime(event.target.value);
    // Implement notification time change logic here
    console.log('Notification time changed to:', event.target.value);
  };

  return (
    <SettingsContainer>
      <Typography variant="h5" gutterBottom>
        Settings
      </Typography>

      <FormControl component="fieldset" style={{ marginBottom: '20px' }}>
        <FormLabel component="legend">Theme</FormLabel>
        <RadioGroup row aria-label="theme" name="theme" value={theme} onChange={handleThemeChange}>
          <FormControlLabel value="light" control={<Radio />} label="Light" />
          <FormControlLabel value="dark" control={<Radio />} label="Dark" />
          <FormControlLabel value="system" control={<Radio />} label="System" />
        </RadioGroup>
      </FormControl>

      <TextField
        label="Notification Time"
        type="time"
        value={notificationTime}
        onChange={handleTimeChange}
        InputLabelProps={{
          shrink: true,
        }}
        style={{ marginBottom: '20px' }}
      />

      <Button variant="contained" color="primary" disabled>Save</Button>  {/* Заглушка для сохранения */}
    </SettingsContainer>
  );
};

export default Settings;