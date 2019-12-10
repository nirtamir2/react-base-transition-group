import React from "react";
import cx from "classnames";
import { TransitionGroup, Status } from "../src";
import { Notification } from "./Notification";
import "./App.css";

interface INotification {
  id: number;
  name: string;
}

function getInitialNotifications() {
  return [
    { id: 1, name: "Hello" },
    { id: 2, name: "World" },
    { id: 3, name: "Hi" },
    { id: 4, name: "Aloha" },
  ];
}

export function App() {
  const [notifications, setNotifications] = React.useState<INotification[]>(
    getInitialNotifications
  );

  function handleRemoveNotification(id: number) {
    setNotifications(notifications => notifications.filter(n => n.id !== id));
  }

  function handleReset() {
    setNotifications(getInitialNotifications);
  }

  return (
    <div>
      <ul className="App__notifications">
        <TransitionGroup
          items={notifications}
          renderItem={(notification, status) => {
            return (
              <li
                className={cx("App__notification", {
                  "App__notification--enter": status === Status.ENTERED,
                  "App__notification--exit": status === Status.EXITED,
                })}
              >
                <Notification
                  onRemove={() => handleRemoveNotification(notification.id)}
                >
                  {notification.name}
                </Notification>
              </li>
            );
          }}
        />
      </ul>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
