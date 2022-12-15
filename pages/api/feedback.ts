import { WithId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { connecttodatabase } from "../../lib/db";

type Data = {
  message: string;
  issuccesful: boolean;
  result?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({
      message: "User not authenticated",
      issuccesful: false,
    });
    return;
  }

  if (req.method === "POST") {
    const name: string = req.body.name;
    const email: string = req.body.email;
    const feedback: string = req.body.feedback;
    const timestamp: string = req.body.timestamp;

    if (!feedback) {
      res.status(432).json({
        message: "No feedback entered",
        issuccesful: false,
      });
      return;
    }
    const client = await connecttodatabase();
    const db = client.db();
    const result = await db.collection("feedbacks").insertOne({
      name: name,
      email: email,
      feedback: feedback,
      timestamp: timestamp,
    });
    res
      .status(200)
      .json({ message: "feedback added succesfully", issuccesful: true });
    client.close();
    return;
  }
  if (req.method === "GET") {
    const client = await connecttodatabase();
    const db = client.db();
    const result = await db
      .collection("feedbacks")
      .find()
      .sort({ _id: -1 })
      .toArray();
    res.status(200).json({
      message: "all feedback recived",
      issuccesful: true,
      result: result,
    });
    client.close();
    return;
  }
}
