import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import { Suspense } from "react";

interface valuearray {
  close: string;
  datetime: string;
  high: string;
  low: string;
  open: string;
  volume: string;
}

interface data {
  meta?: any;
  status?: string;
  values?: valuearray[];
  code?: number;
  message?: string;
}
export default function Graph(props: { data: data; symbol: string }) {
  const router = useRouter();
  const { status, data } = useSession();
  //   console.log(status);
  //   console.log(props.data.values);
  if (status === "authenticated") {
    if (props.data.status === "error") {
      return (
        <>
          <h1>{props.symbol}</h1>
          <h2>No graph available for this stock</h2>
        </>
      );
    }
    const Mygraph = dynamic(
      () => import("../../components/graph"), // replace '@components/map' with your component's location
      { ssr: false, suspense: true } // This line is important. It's what prevents server-side render
    );
    return (
      <>
        <h1>{props.symbol}</h1>
        <Suspense fallback={`Please Wait Loading...`}>
          <Mygraph data={props.data.values} />
        </Suspense>
      </>
    );
  }
  if (status === "unauthenticated") {
    router.replace("/");
  }
  if (status === "loading") {
    return <h1>Loading...</h1>;
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // ...
  const { params, req, res } = context;
  const symbol = params?.symbol;
  //api key
  const ranakey = "f28656c563c24a9fa2a43e14e9426e07";

  //getting response
  const response = await fetch(
    "https://api.twelvedata.com/time_series?symbol=" +
      symbol +
      "&outputsize=100&interval=1day&apikey=" +
      ranakey
  );
  const data = await response.json();
  return {
    props: {
      data: data,
      symbol: symbol,
    },
  };
};
