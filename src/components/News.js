import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {
  List,
  ListItem,
  ListItemText,
  Typography
} from '@mui/material';

const NewsContainer = styled.div`
  padding: 20px;
`;

const NewsItem = styled(ListItem)`
  border-bottom: 1px solid #eee;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const NewsTitle = styled(Typography)`
  font-weight: 500;
`;

const NewsDescription = styled(Typography)`
  color: #666;
`;

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      // Replace with your actual news API endpoint
      const response = await axios.get('https://api.example.com/news');
      setNews(response.data);
    } catch (error) {
      console.error('Error fetching news:', error);
      setNews([
        { id: 1, title: "Dummy News 1", description: "This is a dummy news item." },
        { id: 2, title: "Dummy News 2", description: "Another dummy news item for testing." }
      ]);
    }
  };

  return (
    <NewsContainer>
      <Typography variant="h5" gutterBottom>
        News
      </Typography>
      <List>
        {news.map(item => (
          <NewsItem key={item.id}>
            <ListItemText
              primary={<NewsTitle>{item.title}</NewsTitle>}
              secondary={<NewsDescription>{item.description}</NewsDescription>}
            />
          </NewsItem>
        ))}
      </List>
    </NewsContainer>
  );
};

export default News;