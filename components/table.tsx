import { useRouter } from "next/router";
import React from "react";
import style from "./table.module.css";

interface data {
  access?: { global: string; plan: string };
  country?: string;
  currency?: string;
  exchange?: string;
  mic_code?: string;
  name?: string;
  symbol?: string;
  type?: string;
}

export default function Table(props: { data: data[] }) {
  const router = useRouter();
  function symboltoparent(symbol: string | undefined) {
    if (symbol) {
      router.push(`/auth-user/${symbol}`);
    }
  }

  //// mapping the data from api to array
  const mapedrow = props.data
    .filter((curval, i) => {
      if (i === 84 || (i > 53 && i % 54 === 0)) {
        return true;
      }
      return false; // skip
    })
    .map((curval, i) => {
      return (
        <tr key={i} onClick={() => symboltoparent(curval.symbol)}>
          <td>{curval.symbol}</td>
          <td>{curval.country}</td>
          <td>{curval.currency}</td>
          <td>{curval.exchange}</td>
          <td>{curval.name}</td>
          <td>{curval.type}</td>
        </tr>
      );
    });

  return (
    <div className={style.tablecontainer}>
      <table className={style.basetable}>
        <tbody>
          <tr>
            <th>Symbol</th>
            <th>Country</th>
            <th>Currency</th>
            <th>Exchange</th>
            <th>Name</th>
            <th>Type</th>
          </tr>
          {mapedrow}
        </tbody>
      </table>
    </div>
  );
}
