import { useReducer, createContext, useContext } from "react";

/**
 * A reducer function to manage the state of a notification.
 *
 * The state can be either a string (the notification message) or null
 * (no notification is shown).
 *
 * The reducer responds to two types of actions. If the action type is
 * "SHOW_NOTIFICATION", the state is updated with the message provided in
 * the action payload. If the action type is "HIDE_NOTIFICATION", the state
 * is reset to null.
 *
 * If the action type is unknown, the reducer returns the current state
 * unchanged.
 */

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_NOTIFICATION":
      return action.payload;
    case "HIDE_NOTIFICATION":
      return null;
    default:
      return state;
  }
};

const NotificationContext = createContext();

/**
 * A React Context Provider component that makes the notification state
 * and dispatch function available to its descendants.
 *
 * The Provider component wraps the given children components and
 * provides them with the current notification state and a dispatch
 * function via the NotificationContext.
 *
 * @param {Object} props The props object should contain a single
 *                       property, children, which is the React
 *                       component or components that should be
 *                       wrapped with the NotificationContext.
 * @returns A React component that wraps the given children components
 *          with the NotificationContext.
 */
export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  );
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

/**
 * Hook to access the current notification value.
 *
 * Returns the current notification value. The value is either a string
 * (the notification message) or null (no notification is shown).
 */

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};

/**
 * Hook to access the dispatch function for managing notifications.
 *
 * Returns the dispatch function associated with the notification context,
 * allowing actions to be dispatched to show or hide notifications.
 */
export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};

export default NotificationContext;
