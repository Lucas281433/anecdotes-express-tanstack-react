import axios from "axios";

const baseUrl = "/api/anecdotes";

/**
 * Fetches all anecdotes from the server.
 *
 * @returns A promise that resolves to an array of all anecdotes.
 */
export const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

/**
 * Creates a new anecdote by sending a POST request to the server.
 *
 * @param {Object} anecdote - The anecdote object to be created, containing content and votes.
 * @returns {Promise<Object>} A promise that resolves to the newly created anecdote data.
 */
export const create = async (anecdote) => {
  const response = await axios.post(baseUrl, anecdote);
  return response.data;
};

/**
 * Updates an anecdote by sending a PUT request to the server.
 *
 * @param {Object} anecdote - The anecdote object to be updated, containing id, content and votes.
 * @returns {Promise<Object>} A promise that resolves to the updated anecdote data.
 */
export const update = async (anecdote) => {
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote);
  return response.data;
};
