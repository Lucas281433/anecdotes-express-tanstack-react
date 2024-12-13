import { NewAnecdote } from "../types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

export const parseContent = (content: unknown): string => {
  if (!content || !isString(content) || content.length < 5) {
    throw new Error("Content must be a string with length greater than 5");
  }
  return content;
};

export const toNewAnecdote = (object: unknown): NewAnecdote => {
    if (!object || typeof object !== "object") {
        throw new Error("Anecdote must be an object");
    }

    if ("content" in object) {
        const newAnecdote: NewAnecdote = {
            content: parseContent(object.content)
        };
        return newAnecdote;
    }
    throw new Error("Anecdote must have a content property"); 
};   