const API_URL = '/api'; // Use relative path to leverage the proxy

export const getAllCards = async () => {
  const response = await fetch(`${API_URL}/cards`);
  const data = await response.json();
  return data;
};

export const createCard = async (card) => {
  const response = await fetch(`${API_URL}/cards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(card),
  });
  const data = await response.json();
  return data;
};

export const updateCard = async (id, card) => {
  const response = await fetch(`${API_URL}/cards/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(card),
  });
  const data = await response.json();
  return data;
};

export const deleteCard = async (id) => {
  await fetch(`${API_URL}/cards/${id}`, {
    method: 'DELETE',
  });
};

export const getAllDecks = async () => {
  const response = await fetch(`${API_URL}/decks`);
  const data = await response.json();
  return data;
};

export const createDeck = async (deck) => {
  const response = await fetch(`${API_URL}/decks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(deck),
  });
  const data = await response.json();
  return data;
};

export const updateDeck = async (id, deck) => {
  const response = await fetch(`${API_URL}/decks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(deck),
  });
  const data = await response.json();
  return data;
};

export const deleteDeck = async (id) => {
  await fetch(`${API_URL}/decks/${id}`, {
    method: 'DELETE',
  });
};

export const addCardToDeck = async (deckId, cardId, quantity) => {
  const response = await fetch(`${API_URL}/decks/addCard`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ deckId, cardId, quantity }),
  });
  const data = await response.json();
  return data;
};

export const removeCardFromDeck = async (deckId, cardId) => {
  await fetch(`${API_URL}/decks/removeCard`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ deckId, cardId }),
  });
};

export const getDeckWithCards = async (id) => {
  const response = await fetch(`${API_URL}/decks/${id}`);
  const data = await response.json();
  return data;
};