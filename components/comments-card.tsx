import React from "react";
import classes from "./comments-card.module.css";

interface resultarray {
  email: string;
  feedback: string;
  name: string;
  timestamp: string;
  _id: string;
}

export default function CommentCard(props: {
  data: resultarray[] | undefined;
}) {
  return (
    <ul className={classes.comments}>
      <h2>FeedBacks</h2>
      {props.data?.map((curval) => {
        //new code only here and some imports
        //new code end here
        return (
          <li key={curval._id}>
            <h5>
              <u>{curval.timestamp}</u>
            </h5>
            <p>{curval.feedback}</p>
            <div>
              By - <address>{curval.name}</address>
              <br />
              <address>{curval.email}</address>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
