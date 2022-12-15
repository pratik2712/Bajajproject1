import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

interface valuearray {
  close: string;
  datetime: string;
  high: string;
  low: string;
  open: string;
  volume: string;
}

export default function MyGraph(props: { data: valuearray[] | undefined }) {
  const [Xval, setXval] = useState<string[]>([]);
  const [Yval, setYval] = useState<string[]>([]);

  useEffect(() => {
    props.data?.map((curval) => {
      setXval((revstate) => {
        return [...revstate, curval.datetime];
      });
      setYval((revstate) => {
        return [...revstate, curval.open];
      });
    });
  }, []);
  //   console.log(props.data);

  return (
    <div>
      <Plot
        data={[
          {
            x: Xval,
            y: Yval,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "red" },
          },
        ]}
        layout={{ width: 1660, height: 710, title: "Price-Action" }}
      />
    </div>
  );
}
