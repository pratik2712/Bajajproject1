import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import Carousel from "../../components/carousel";
import Table from "../../components/table";
import style from "./index.module.css";

interface data {
  access: { global: string; plan: string };
  country?: string;
  currency?: string;
  exchange?: string;
  mic_code?: string;
  name?: string;
  symbol?: string;
  type?: string;
}

export default function Home(props: { data: data[] }) {
  const router = useRouter();
  const { status, data } = useSession();
  if (status === "authenticated") {
    return (
      <div className={style.layout}>
        <div className={style.infocontainer}>
          <ul>
            <li>
              Discover stocks with smart lists and smart filters Access key
              company information
            </li>
            <li>
              Search stocks easily using smart lists and smart filters. Get
              latest news, analyse charts and find in-depth company information
              to make informed decisions.
            </li>
            <li>
              Apply stratergies tested and created by on filed experts with the
              real time data provided by us and 24/7 expert support
            </li>
          </ul>
        </div>
        <div className={style.tablecontainer}>
          <Table data={props.data} />
        </div>
        <div className={style.craoselcontainer}>
          <Carousel />
        </div>
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

export async function getStaticProps() {
  const response = await fetch(
    "https://api.twelvedata.com/stocks?&show_plan=true&country=India"
  );
  const obj = await response.json();
  const data: data[] = obj.data;
  return {
    props: {
      data: data,
    },
    revalidate: 6000,
  };
}
