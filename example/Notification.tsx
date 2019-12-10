import React from "react";
import "./Notification.css";

interface IProps {
  onRemove: () => void;
  children: React.ReactNode;
}

export function Notification(props: IProps) {
  const { onRemove, children } = props;
  return (
    <div className="Notification">
      <div>{children}</div>
      <button className="Notification__button" onClick={onRemove}>X</button>
    </div>
  );
}
