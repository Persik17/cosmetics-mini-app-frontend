import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import News from './components/News';
import Settings from './components/Settings';
import Profile from './components/Profile';
import About from './components/About';
import GlobalStyle from './GlobalStyles';
import BottomNavigation from './components/BottomNavigation';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

function App() {
  const [activeTab, setActiveTab] = useState('calendar');

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const themeParams = window.Telegram.WebApp.themeParams;
      document.body.style.backgroundColor = themeParams.bg_color || '#fff';
      document.body.style.color = themeParams.text_color || '#000';
    }
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'news':
        return <News />;
      case 'calendar':
        return <Calendar />;
      case 'settings':
        return <Settings />;
      case 'profile':
        return <Profile />;
      case 'about':
        return <About />;
      default:
        return <Calendar />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div className="App">
        {renderContent()}
      </div>
      <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </ThemeProvider>
  );
}

export default App;