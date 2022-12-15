import styles from "./layout.module.css";
import React from "react";
import Navbar from "../components/navbar";

export default function Layout(props: { children: JSX.Element }) {
  return (
    <div>
      <Navbar />
      <main>{props.children}</main>
    </div>
  );
}
