import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAll, update } from "./request";
import { useNotificationDispatch } from "./NotificationContext";
import { Card, CardContent, Container, Stack, Button } from "@mui/material";

import AnecdoteForm from "./components/AnecdoteForm/AnecdoteForm";
import Notification from "./components/Notification/Notification";
import anecdotesImage from "./assets/tanstack-react-query-anecdotes.jpg";

/**
 * The main application component.
 *
 * Displays a list of anecdotes sorted by the number of votes in descending order.
 * Each anecdote is displayed as a card with a vote button.
 * When the vote button is clicked, the vote count of the corresponding anecdote is
 * incremented and the notification is displayed at the top of the page.
 *
 * If the anecdotes service is not available due to problems in the server, a
 * message is displayed indicating that the service is not available.
 *
 * The application also displays a form to create a new anecdote.
 * When the form is submitted, the new anecdote is added to the list of anecdotes
 * and a notification is displayed at the top of the page.
 *
 * @returns A JSX element representing the main application component.
 */
const App = () => {
  const dispatch = useNotificationDispatch();
  const queryClient = useQueryClient();
  const voteMutation = useMutation({
    mutationFn: update,
    onSuccess: () => {
      queryClient.invalidateQueries(["anecdotes"]);
    },
  });

  /**
   * Handles the vote event by incrementing the vote count of the given anecdote
   * and adding it to the list of anecdotes. If the mutation is successful, a
   * success notification is shown. If the mutation fails, an error notification
   * is shown with the error message from the server. The notification is displayed
   * for 5 seconds.
   *
   * @param {Object} anecdote - The anecdote to be voted.
   */
  const handleVote = (anecdote) => {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };
    voteMutation.mutate(updatedAnecdote);
    dispatch({
      type: "SHOW_NOTIFICATION",
      payload: `Anecdote '${anecdote.content}' voted`,
    });
    setTimeout(() => {
      dispatch({ type: "HIDE_NOTIFICATION" });
    }, 5000);
  };

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAll,
    retry: false,
    refetchOnWindowFocus: false,
    select: (data) => data.sort((a, b) => b.votes - a.votes),
  });

  if (result.isLoading) {
    return <div>Loading Data....</div>;
  }
  if (result.isError) {
    return <div>Anecdotes service not avaible due to Problems in Server</div>;
  }

  const anecdotes = result.data;
  const mostVotedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  return (
    <Container>
      <h1 className="title">Anecdote app</h1>
      <Stack alignItems="center" marginBottom={"1rem"}>
        <img src={anecdotesImage} width="350" className="anecdote-image" />
      </Stack>
      <Notification />
      <Stack direction="column" alignItems="center" marginBottom={"2rem"}>
        <AnecdoteForm />
      </Stack>

      {mostVotedAnecdotes.map((anecdote) => (
        <Card key={anecdote.id} className="card">
          <CardContent>
            <div>{anecdote.content}</div>
            <div style={{ marginTop: "1rem" }}>
              Has {anecdote.votes} Votes
              <Button
                variant="contained"
                size="small"
                className="button-style"
                onClick={() => handleVote(anecdote)}
              >
                vote
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default App;
