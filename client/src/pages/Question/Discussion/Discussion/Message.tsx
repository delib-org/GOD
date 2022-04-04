import React from "react";
import { get } from "lodash";

interface MessageProps {
  msg: any;
}

const Message = (props: MessageProps) => {
  const { msg } = props;

  const displayName = get(msg, "roles.creator.displayName", "");
  if (displayName.length === 0) {
    console.warn(`message ${msg._id} has no creator`);
    console.log(JSON.stringify(msg));
  }
  try {
    return (
      <div className="message">
        <div className="creator">
          {displayName}-{msg.date}
        </div>
        <div className="content">{msg.text}</div>
      </div>
    );
  } catch (error) {
    console.log(msg);
    console.error(error);
    return null;
  }
};

export default Message;
