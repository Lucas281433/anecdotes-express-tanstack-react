"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const anecdoteService_1 = __importDefault(require("../service/anecdoteService"));
const utils_1 = require("../utils/utils");
/**
 * Router for handling requests related to anecdotes.
 */
const anecdotesRouter = express_1.default.Router();
/**
 * Retrieves all anecdotes.
 *
 * @route GET /
 * @returns {Array} An array of objects representing the anecdotes.
 */
anecdotesRouter.get("/", (_req, res) => {
    try {
        const anecdotes = anecdoteService_1.default.getAll();
        res.status(200).json(anecdotes);
    }
    catch (error) {
        let message = "Anecdotes not found";
        if (error instanceof Error) {
            message += "Error: " + error.message;
        }
        res.status(400).json({ error: message });
    }
});
/**
 * Creates a new anecdote.
 *
 * @route POST /
 * @param {Object} req.body - The object containing the anecdote to create.
 * @returns {Object} The object representing the created anecdote.
 */
anecdotesRouter.post("/", (req, res) => {
    try {
        const anecdote = (0, utils_1.toNewAnecdote)(req.body);
        const newAnecdote = anecdoteService_1.default.create(anecdote);
        res.status(201).json(newAnecdote);
    }
    catch (error) {
        let message = "Anecdote not created";
        if (error instanceof Error) {
            message += "Error: " + error.message;
        }
        res.status(400).json({ error: message });
    }
});
/**
 * Updates an existing anecdote.
 *
 * @route PUT /:id
 * @param {String} req.params.id - The ID of the anecdote to update.
 * @returns {Object} The object representing the updated anecdote.
 */
anecdotesRouter.put("/:id", (req, res) => {
    try {
        const anecdote = anecdoteService_1.default.update(req.params.id);
        if (!anecdote) {
            res.status(404).json({ error: "Anecdote not found" });
        }
        res.status(200).json(anecdote);
    }
    catch (error) {
        let message = "Anecdote not updated";
        if (error instanceof Error) {
            message += "Error: " + error.message;
        }
        res.status(400).json({ error: message });
    }
});
exports.default = anecdotesRouter;
