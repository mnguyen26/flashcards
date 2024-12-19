import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://localhost:7010/api',
  headers: {
      'Content-Type': 'application/json',
  },
});

export const getCardsByDeck = async (deck: string) => {
  const response = await apiClient.get(`/Cards/Deck/${deck}`);
  return response.data;
};
