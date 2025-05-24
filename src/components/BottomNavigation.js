import React from 'react';
import styled from 'styled-components';
import {
  Home,
  Settings as SettingsIcon, // Renamed to avoid conflict
  Info,
  CalendarMonth,
  AccountCircle // Profile Icon
} from '@mui/icons-material';
import {
  IconButton,
  Typography
} from '@mui/material';

const NavContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  border-top: 1px solid #eee;
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.05);
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const BottomNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <NavContainer>
      <NavItem onClick={() => setActiveTab('news')}>
        <IconButton color={activeTab === 'news' ? 'primary' : 'default'}>
          <Home />
        </IconButton>
        <Typography variant="caption" color={activeTab === 'news' ? 'primary' : 'default'}>News</Typography>
      </NavItem>
      <NavItem onClick={() => setActiveTab('profile')}>
        <IconButton color={activeTab === 'profile' ? 'primary' : 'default'}>
          <AccountCircle /> {/* Profile Icon */}
        </IconButton>
        <Typography variant="caption" color={activeTab === 'profile' ? 'primary' : 'default'}>Profile</Typography>
      </NavItem>
      <NavItem onClick={() => setActiveTab('calendar')}>
        <IconButton color={activeTab === 'calendar' ? 'primary' : 'default'}>
          <CalendarMonth />
        </IconButton>
        <Typography variant="caption" color={activeTab === 'calendar' ? 'primary' : 'default'}>Calendar</Typography>
      </NavItem>
      <NavItem onClick={() => setActiveTab('settings')}>
        <IconButton color={activeTab === 'settings' ? 'primary' : 'default'}>
          <SettingsIcon /> {/* Use renamed SettingsIcon */}
        </IconButton>
        <Typography variant="caption" color={activeTab === 'settings' ? 'primary' : 'default'}>Settings</Typography>
      </NavItem>
      <NavItem onClick={() => setActiveTab('about')}>
        <IconButton color={activeTab === 'about' ? 'primary' : 'default'}>
          <Info />
        </IconButton>
        <Typography variant="caption" color={activeTab === 'about' ? 'primary' : 'default'}>About</Typography>
      </NavItem>
    </NavContainer>
  );
};

export default BottomNavigation;