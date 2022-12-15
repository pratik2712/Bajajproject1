import classes from "./navbar.module.css";
import React from "react";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { status, data } = useSession();
  const router = useRouter();
  function login() {
    router.push("/login-signup/login");
  }
  function signup() {
    router.push("/login-signup/signup");
  }
  function about() {
    router.push("/about");
  }
  function logout() {
    signOut();
  }
  function feedback() {
    router.push("/auth-user/feedback");
  }
  function home() {
    router.push("/auth-user");
  }
  let showlogin = true;

  if (status === "authenticated") {
    showlogin = false;
  }
  if (status === "unauthenticated") {
    showlogin = true;
  }
  if (status === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Stock Makers</div>
      <nav>
        <ul>
          {!showlogin && <li onClick={home}>Home</li>}
          {!showlogin && <li onClick={feedback}>Feedback</li>}
          <li onClick={about}>About Us</li>
          {showlogin && <li onClick={login}>Login</li>}
          {showlogin && <li onClick={signup}>Signup</li>}
          {!showlogin && <li onClick={logout}>Logout</li>}
        </ul>
      </nav>
    </header>
  );
}
