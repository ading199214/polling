import axios from 'axios';

export const getPoll = () => axios.get('/api/poll');

export const submitVote = (votes) =>
  axios.post('/api/vote', { votes });

export const addOption = (optionText) =>
  axios.post('/api/add-option', { optionText });

export const getResults = () => axios.get('/api/results');