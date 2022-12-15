import React, { useRef } from "react";
import { signIn, useSession } from "next-auth/react";
import style from "./login.module.css";
import { useRouter } from "next/router";
export default function Login() {
  const { status, data } = useSession();
  const router = useRouter();
  const emailref = useRef<HTMLInputElement>(null);
  const passwordref = useRef<HTMLInputElement>(null);

  async function handlesubmit(e: React.FormEvent) {
    e.preventDefault();
    const emailip = emailref.current?.value;
    const passip = passwordref.current?.value;
    if (!emailip || !passip) {
      alert("please provide details");
      return;
    }
    const res = await signIn("credentials", {
      redirect: false,
      email: emailip,
      password: passip,
    });
    if (res?.error === "No such user exists") {
      alert("No such user exists");
    }
    if (res?.error === "Incorrect Password") {
      alert("Incorrect Password");
    }
    if (!res?.error) {
      alert("succesfully logged in");
      router.replace("/auth-user");
    }
  }

  if (status === "authenticated") {
    router.replace("/auth-user");
  }
  if (status === "unauthenticated") {
    return (
      <div className={style.signup}>
        <form className={style.form} onSubmit={handlesubmit}>
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
