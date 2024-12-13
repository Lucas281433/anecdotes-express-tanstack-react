export interface Anecdote {
    content: string;
    id: string;
    votes: number;
}

export type NewAnecdote = Omit<Anecdote, "id" | "votes">;