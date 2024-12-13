"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewAnecdote = exports.parseContent = void 0;
const isString = (text) => {
    return typeof text === "string" || text instanceof String;
};
const parseContent = (content) => {
    if (!content || !isString(content) || content.length < 5) {
        throw new Error("Content must be a string with length greater than 5");
    }
    return content;
};
exports.parseContent = parseContent;
const toNewAnecdote = (object) => {
    if (!object || typeof object !== "object") {
        throw new Error("Anecdote must be an object");
    }
    if ("content" in object) {
        const newAnecdote = {
            content: (0, exports.parseContent)(object.content)
        };
        return newAnecdote;
    }
    throw new Error("Anecdote must have a content property");
};
exports.toNewAnecdote = toNewAnecdote;
