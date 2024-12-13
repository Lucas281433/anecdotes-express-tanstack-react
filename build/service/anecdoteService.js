"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = __importDefault(require("../data/data"));
const uuid_1 = require("uuid");
/**
 * Retrieves all anecdotes.
 *
 * @returns {Array} An array of objects representing the anecdotes.
 */
const getAll = () => {
    return data_1.default;
};
/**
 * Creates a new anecdote with a unique id and zero votes,
 * and adds it to the list of anecdotes.
 *
 * @param {NewAnecdote} anecdote - The object containing the content of the new anecdote.
 * @returns {Anecdote} The newly created anecdote with assigned id and initial votes.
 */
const create = (anecdote) => {
    const andote = {
        content: anecdote.content,
        id: (0, uuid_1.v1)(),
        votes: 0,
    };
    data_1.default.push(andote);
    return andote;
};
/**
 * Updates the votes of an anecdote with the given id by one.
 *
 * @param {string} id - The id of the anecdote to update.
 * @returns {Anecdote[]} The list of anecdotes with the updated anecdote.
 * @throws {Error} If the anecdote with the given id does not exist.
 */
const update = (id) => {
    const anecdoteToUpdate = data_1.default.find((a) => a.id === id);
    if (!anecdoteToUpdate) {
        throw new Error("Anecdote not found");
    }
    ;
    const updatedAnecdote = Object.assign(Object.assign({}, anecdoteToUpdate), { votes: anecdoteToUpdate.votes + 1 });
    const index = data_1.default.findIndex((a) => a.id === id);
    data_1.default[index] = updatedAnecdote;
    return data_1.default;
};
exports.default = { getAll, create, update };
