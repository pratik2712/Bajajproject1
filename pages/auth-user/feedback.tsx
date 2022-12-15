import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import CommentCard from "../../components/comments-card";
import style from "./feedback.module.css";

export default function Feedback() {
  interface resultarray {
    email: string;
    feedback: string;
    name: string;
    timestamp: string;
    _id: string;
  }
  interface resdata {
    issuccesful: boolean;
    message: string;
    result: resultarray[];
  }

  const router = useRouter();

  const [feedbackstate, setfeedbackstate] = useState<resdata>();
  const [show_hide, setshow_hide] = useState<boolean>(false);

  let btntext;
  if (!show_hide) btntext = "show";
  else btntext = "hide";

  const { status, data } = useSession();
  const feedbackref = useRef<HTMLTextAreaElement>(null);
  //feedback recive code
  async function clickhandler() {
    if (!show_hide) {
      const getresponse = await fetch("/api/feedback");
      const getdata = await getresponse.json();
      setfeedbackstate(getdata);
    }
    setshow_hide((prevstate) => {
      return !prevstate;
    });
  }
  //feedback send code
  async function submithandler(e: React.FormEvent) {
    e.preventDefault();
    const feedbackip = feedbackref.current?.value;
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let mins = date.getMinutes();

    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${hour}:${mins} ${day}-${month}-${year}`;

    if (!feedbackip) {
      alert("No Feedback provided");
    } else {
      const response = await fetch("/api/feedback", {
        method: "POST",
        body: JSON.stringify({
          name: data?.user?.name,
          email: data?.user?.email,
          feedback: feedbackip,
          timestamp: currentDate,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const resdata = await response.json();
      if (resdata.issuccesful) {
        const getresponse = await fetch("/api/feedback");
        const getdata = await getresponse.json();
        setfeedbackstate(getdata);
        alert("Thanks for your feedback");
        feedbackref.current.value = "";
      }
    }
  }
  if (status === "authenticated") {
    return (
      <div className={style.container}>
        <h1>Welcome {data.user?.name} your feedback is precious to us</h1>
        <form className={style.feedbackform} onSubmit={submithandler}>
          <p>
            <label htmlFor="feedback">Your Feedback</label>
          </p>
          <textarea
            id="feedback"
            name="feedback"
            rows={4}
            cols={70}
            ref={feedbackref}
          ></textarea>
          <br />
          <button className={style.button27} role="button">
            Submit
          </button>
        </form>
        <br />
        <hr />
        <br />
        <button onClick={clickhandler} className={style.button27s}>
          {btntext} FeedBacks
        </button>
        {show_hide && <CommentCard data={feedbackstate?.result} />}
      </div>
    );
  }
  if (status === "unauthenticated") {
    router.replace("/");
  }
  if (status === "loading") {
    return <h1>Loading...</h1>;
  }
}
