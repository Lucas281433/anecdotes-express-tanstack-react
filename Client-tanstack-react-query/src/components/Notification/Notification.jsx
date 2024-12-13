import { Alert } from "@mui/material";
import { useNotificationValue } from "../../NotificationContext";

import "./Notification.css"

/**
 * A component that displays a notification message with a green background.
 * It is invisible when there is no notification.
 * The notification is displayed for 5 seconds after which it disappears.
 *
 * The notification is displayed with a green background and a success
 * severity. The notification message is the one passed by the
 * useNotificationValue hook.
 *
 * @returns A JSX element representing the notification message or null
 * if there is no notification.
 */
const Notification = () => {
  const notification = useNotificationValue();

  if (!notification) {
    return null;
  }

  return (
    <Alert
      variant="filled"
      severity="success"
      className="notification-success"
    >
      {notification}
    </Alert>
  );
};

export default Notification;
