import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

export default function Home() {
  const router = useRouter();
  const { status, data } = useSession();
  console.log(status);

  if (status === "authenticated") {
    router.replace("/auth-user");
  }
  if (status === "unauthenticated") {
    return (
      <div className={styles.container}>
        <h1>Home</h1>
        <p>
          We Provide one stop solution for all your stocks related queries and
          problems.
        </p>
        <p>Login or Signup with us to utilze full extent of our services</p>
      </div>
    );
  }
  if (status === "loading") {
    return <h1>Loading...</h1>;
  }
}
