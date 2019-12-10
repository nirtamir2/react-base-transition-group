# React Base Transition Group

Open source library for managing component states (including mounting and unmounting) over time for css transitions and animations.

Inspired by [react-transition-group](https://github.com/reactjs/react-transition-group).

The main difference is that you don't have to use the and instead you **Must** add transition / animation in order to unmount a child component.

## Install

```bash
yarn add react-base-transition-group
```

## Usage

```typescript jsx
import cx from "classnames";
import { TransitionGroup, Status } from "react-base-transition-group";

function App() {
  const [notifications, setNotification] = React.useState([
    { id: 1, title: "A" },
    { id: 2, title: "B" },
  ]);

  return (
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
            {notification.title}
          </div>
        );
      }}
    />
  );
}
```

You can see the examples in the example folder.
If you want the animation appear on the initial appear - you can set the prop `initialStatus` to be `Status.ENTERED`.
