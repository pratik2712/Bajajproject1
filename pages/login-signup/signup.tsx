import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import style from "./signup.module.css";

export default function Signup() {
  const { status, data } = useSession();
  const [userregistered, setuserregistered] = useState<boolean>(false);
  const [resmsg, setresmsg] = useState<string>("");
  const router = useRouter();
  const nameref = useRef<HTMLInputElement>(null);
  const emailref = useRef<HTMLInputElement>(null);
  const passwordref = useRef<HTMLInputElement>(null);

  async function handlesubmit(e: React.FormEvent) {
    e.preventDefault();
    const nameip = nameref.current?.value;
    const emailip = emailref.current?.value;
    const passwordip = passwordref.current?.value;
    if (!nameip || !emailip || !passwordip) {
      alert("Plz provide all the details");
    } else {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          name: nameip,
          email: emailip,
          password: passwordip,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data: { message: string; issuccesful: boolean } = await res.json();
      setuserregistered(data.issuccesful);
      setresmsg(data.message);
      console.log(data);
    }
  }
  if (userregistered) {
    alert("registered succesfully");
    router.replace("/");
  } else if (!userregistered) {
    if (resmsg === "invalid input or password < 7")
      alert("invalid input or password < 7");
    else if (resmsg === `user already exists ${emailref.current?.value}`) {
      alert("user already exists ");
    }
  }

  if (status === "authenticated") {
    router.replace("/");
  }
  if (status === "unauthenticated") {
    return (
      <div className={style.signup}>
        <form className={style.form} onSubmit={handlesubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="John Doe" ref={nameref} />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="johndoe11@gmail.com"
              ref={emailref}
            />
          </div>
          <div>
            <label htmlFor="pass">Password</label>
            <input
              type="password"
              id="pass"
              placeholder="johndoe@123"
              ref={passwordref}
            />
          </div>
          <button className={style.button27} role="button">
            Submit
          </button>
        </form>
      </div>
    );
  }
  if (status === "loading") {
    return <h1>Loading...</h1>;
  }
}
