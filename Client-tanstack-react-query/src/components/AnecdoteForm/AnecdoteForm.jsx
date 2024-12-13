import { Button, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { create } from "../../request";
import { useNotificationDispatch } from "../../NotificationContext";

import "./AnecdoteForm.css";

/**
 * Form to create a new anecdote.
 *
 * When the form is submitted, a mutation is triggered to create a new anecdote.
 * If the mutation is successful, the new anecdote is added to the list of anecdotes
 * and a success notification is shown. If the mutation fails, an error notification
 * is shown with the error message from the server.
 *
 * @returns A JSX element representing the form to create a new anecdote.
 */
const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch();
  const queryClient = useQueryClient();
  
  const newAnecdoteMutation = useMutation({
    mutationFn: create,
/**
 * Callback function executed upon successful mutation.
 * Updates the existing list of anecdotes in the cache by adding the newly created anecdote.
 *
 * @param {Object} anecdote - The newly created anecdote object.
 */
    onSuccess: (anecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(anecdote));
    },
    
/**
 * Callback function executed when a mutation error occurs.
 * Dispatches an error notification with the received error message or a default message
 * if the error message is unavailable. The notification is displayed for 5 seconds.
 *
 * @param {Object} error - The error object containing the response data.
 */
    onError: (error) => {
      dispatch({
        type: "SHOW_NOTIFICATION",
        payload:
          error.response.data.error ||
          "Too short anecdote, must have length 5 or more",
      });
      setTimeout(() => {
        dispatch({ type: "HIDE_NOTIFICATION" });
      }, 5000);
    },
  });

  /**
   * Handles the form submit event by creating a new anecdote
   * with the given content and adding it to the list of anecdotes.
   * If the mutation is successful, a success notification is shown.
   * If the mutation fails, an error notification is shown with the
   * error message from the server.
   *
   * @param {Event} event The form submit event.
   */
  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0 });
    dispatch({
      type: "SHOW_NOTIFICATION",
      payload: `Created anecdote '${content}'`,
    });
    setTimeout(() => {
      dispatch({ type: "HIDE_NOTIFICATION" });
    }, 5000);
  };

  return (
    <div>
      <h3 className="title">Create new</h3>
      <form onSubmit={onCreate}>
        <TextField
          size="small"
          name="anecdote"
          className="input-style"
        />
        <Button
          variant="contained"
          type="submit"
          className="form-button button-style"
        >
          create
        </Button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
