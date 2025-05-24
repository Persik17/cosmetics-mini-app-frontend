import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import styled from 'styled-components';
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  Edit
} from '@mui/icons-material';

const CalendarContainer = styled.div`
  padding: 10px;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
`;

const DayNumber = styled(Typography)`
  font-size: 0.875rem;
`;

const StyledDialogTitle = styled(DialogTitle)`
  background-color: #e91e63;
  color: white;
`;

const EditButton = styled(IconButton)`
  padding: 5px;
`;

const StyledDayContainer = styled.div`
  text-align: center;
  padding: 8px;
  border: 1px solid #eee;
  cursor: pointer;
  background-color: #fff;
  transition: background-color 0.2s ease;
  position: relative;
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 1px 3px rgba(0,0,0,0.1); /* Subtle shadow */
  font-weight: 500;

  &:hover {
    background-color: #f5f5f5;
  }

  &.different-month {
    color: #ccc;
  }

  &.has-cosmetics {
    background-color: #f9f9f9;
  }

  &.has-cosmetics::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    border-width: 8px;
    border-style: solid;
    border-color: #e91e63 #f9f9f9 #f9f9f9 #f9f9f9;
    border-radius: 0 8px 0 0; /* Round the corner */
  }
`;

const StyledCosmeticListItem = styled(ListItem)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  margin-bottom: 5px;
`;

const Calendar = () => {
  const [cosmeticsByDate, setCosmeticsByDate] = useState({});
  const [selectedDate, setSelectedDate] = useState(moment());
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCosmetic, setEditingCosmetic] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [telegramUserId, setTelegramUserId] = useState(null);

  useEffect(() => {
    // Get Telegram User ID
    if (window.Telegram && window.Telegram.WebApp) {
      const webApp = window.Telegram.WebApp;
      const userId = webApp.initDataUnsafe?.user?.id; // Use initDataUnsafe in development only
      if (userId) {
        setTelegramUserId(userId);
        fetchCosmetics(userId);
      } else {
        console.warn("Telegram User ID not found. Running in development mode?");
        // Set a default Telegram User ID for development
        setTelegramUserId(123456789);
        fetchCosmetics(123456789);
      }

      // Set Telegram theme (optional)
      const themeParams = webApp.themeParams;
      document.body.style.backgroundColor = themeParams.bg_color || '#fff';
      document.body.style.color = themeParams.text_color || '#000';
    } else {
      console.warn("Telegram Web Apps API not found. Running outside Telegram?");
      // Set a default Telegram User ID for development
      setTelegramUserId(123456789);
      fetchCosmetics(123456789);
    }
  }, []);

  const fetchCosmetics = async (userId) => {
    try {
      const response = await axios.get(`https://localhost:7259/api/Cosmetic/users/${userId}/groupedByDate`);
      setCosmeticsByDate(response.data);
    } catch (error) {
      console.error('Error fetching cosmetics:', error);
    }
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingCosmetic(null);
  };

  const goToPreviousMonth = () => {
    setSelectedDate(moment(selectedDate).subtract(1, 'month'));
  };

  const goToNextMonth = () => {
    setSelectedDate(moment(selectedDate).add(1, 'month'));
  };

  const isDateWithCosmetics = (date) => {
    const formattedDate = date.format('YYYY-MM-DD');
    return cosmeticsByDate[formattedDate] && cosmeticsByDate[formattedDate].length > 0;
  };

  const handleEditClick = (cosmetic) => {
    setEditingCosmetic(cosmetic);
    setEditedName(cosmetic.name);
  };

  const handleSaveClick = async () => {
    if (!editingCosmetic) return;

    try {
      // Make an API call to update the cosmetic
      await axios.put(`https://localhost:7259/api/Cosmetic/${editingCosmetic.id}`, {
        ...editingCosmetic,
        name: editedName
      });

      // Update the state (this will need to be adjusted to work with the new expiry date logic)
      // For simplicity, after editing, just refetch the cosmetics
      fetchCosmetics(telegramUserId);

      handleCloseDialog();
    } catch (error) {
      console.error('Error updating cosmetic:', error);
    }
  };

  const renderCalendar = () => {
    const startOfMonth = moment(selectedDate).startOf('month');
    const endOfMonth = moment(selectedDate).endOf('month');
    const startOfWeek = moment(startOfMonth).startOf('week');
    const endOfWeek = moment(endOfMonth).endOf('week');

    const calendar = [];
    let currentDay = moment(startOfWeek);

    while (currentDay.isSameOrBefore(endOfWeek, 'day')) {
      const day = currentDay.clone();
      calendar.push(day);
      currentDay.add(1, 'day');
    }

    return (
      <CalendarGrid>
        {calendar.map(day => (
          <StyledDayContainer
            key={day.format('YYYY-MM-DD')}
            onClick={() => handleDateClick(day)}
            className={`${!day.isSame(selectedDate, 'month') ? 'different-month' : ''} ${isDateWithCosmetics(day) ? 'has-cosmetics' : ''}`}
          >
            <DayNumber variant="body2">
              {day.format('D')}
            </DayNumber>
          </StyledDayContainer>
        ))}
      </CalendarGrid>
    );
  };

  return (
    <CalendarContainer>
      <CalendarHeader>
        <IconButton onClick={goToPreviousMonth}>
          <ChevronLeft />
        </IconButton>
        <Typography variant="h6">
          {selectedDate.format('MMMM YYYY')}
        </Typography>
        <IconButton onClick={goToNextMonth}>
          <ChevronRight />
        </IconButton>
      </CalendarHeader>

      <CalendarGrid>
        {moment.weekdaysShort().map(day => (
          <StyledDayContainer key={day} style={{ fontWeight: 'bold', cursor: 'default' }}>
            {day}
          </StyledDayContainer>
        ))}
      </CalendarGrid>

      {renderCalendar()}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <StyledDialogTitle>
          Cosmetics for {selectedDate.format('DD.MM.YYYY')}
        </StyledDialogTitle>
        <DialogContent>
          <List>
            {cosmeticsByDate[selectedDate.format('YYYY-MM-DD')] ? (
              cosmeticsByDate[selectedDate.format('YYYY-MM-DD')].map(cosmetic => (
                <StyledCosmeticListItem key={cosmetic.id}>
                  <ListItemText primary={cosmetic.name} />
                  <EditButton onClick={() => handleEditClick(cosmetic)}>
                    <Edit />
                  </EditButton>
                </StyledCosmeticListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="No cosmetics for this date" />
              </ListItem>
            )}
          </List>

          {editingCosmetic && (
            <div>
              <TextField
                label="Cosmetic Name"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                fullWidth
                margin="normal"
              />
              <Button variant="contained" color="primary" onClick={handleSaveClick}>
                Save
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </CalendarContainer>
  );
};

export default Calendar;