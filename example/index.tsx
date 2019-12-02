import "react-app-polyfill/ie11";
import * as React from "react";
import * as ReactDOM from "react-dom";
import cx from "classnames";
import { TransitionGroup, Status } from "../src";
import "./index.css";

interface INotification {
  id: number;
  name: string;
}

function getInitialNotifications() {
  return [
    { id: 1, name: `Nir` },
    { id: 2, name: `Tamir` },
    { id: 3, name: `is` },
    { id: 4, name: `me` },
  ];
}

function App() {
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
    <div className="App">
      <TransitionGroup
        items={notifications}
        renderItem={(notification, status) => {
          return (
            <div
              className={cx("App__notification", {
                "App__notification--enter": status === Status.ENTERED,
                "App__notification--exit": status === Status.EXITED,
              })}
            >
              <div>{notification.name}</div>
              <button onClick={() => handleRemoveNotification(notification.id)}>
                Remove
              </button>
            </div>
          );
        }}
      />
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
