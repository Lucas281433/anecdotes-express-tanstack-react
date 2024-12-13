import anecdotes from "../data/data";
import { Anecdote, NewAnecdote } from "../types";
import { v1 } from "uuid";

/**
 * Retrieves all anecdotes.
 *
 * @returns {Array} An array of objects representing the anecdotes.
 */
const getAll = (): Anecdote[] => {
  return anecdotes;
};


/**
 * Creates a new anecdote with a unique id and zero votes,
 * and adds it to the list of anecdotes.
 *
 * @param {NewAnecdote} anecdote - The object containing the content of the new anecdote.
 * @returns {Anecdote} The newly created anecdote with assigned id and initial votes.
 */
const create = (anecdote: NewAnecdote): Anecdote => {
  const andote: Anecdote = {
    content: anecdote.content,
    id: v1(),
    votes: 0,
  };

  anecdotes.push(andote);
  return andote;
};

/**
 * Updates the votes of an anecdote with the given id by one.
 *
 * @param {string} id - The id of the anecdote to update.
 * @returns {Anecdote[]} The list of anecdotes with the updated anecdote.
 * @throws {Error} If the anecdote with the given id does not exist.
 */
const update = (id: string): Anecdote [] => {
    const anecdoteToUpdate = anecdotes.find((a) => a.id === id);
    
    if (!anecdoteToUpdate) {
        throw new Error("Anecdote not found");
    };

    const updatedAnecdote = {
        ...anecdoteToUpdate, votes: anecdoteToUpdate.votes + 1
    };

    const index = anecdotes.findIndex((a) => a.id === id);
    anecdotes[index] = updatedAnecdote;

    return anecdotes;
};

export default { getAll, create, update };
