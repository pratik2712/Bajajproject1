import type { NextApiRequest, NextApiResponse } from "next";
import { hashPassword } from "../../../lib/auth";
import { connecttodatabase } from "../../../lib/db";

type Data = {
  message: string;
  issuccesful: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //const data : {email : string , password : string} = req.body
  if (req.method === "POST") {
    const name: string = req.body.name;
    const email: string = req.body.email;
    const password: string = req.body.password;
    if (
      !name ||
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
      res
        .status(432)
        .json({ message: "invalid input or password < 7", issuccesful: false });
      return;
    }

    const client = await connecttodatabase();
    const db = client.db();
    const existinguser = await db.collection("users").findOne({ email: email });

    if (existinguser) {
      res.status(422).json({
        message: `user already exists ${email}`,
        issuccesful: false,
      });
      client.close();
      return;
    }
    const hashpass = await hashPassword(password);
    const result = await db.collection("users").insertOne({
      name: name,
      email: email,
      password: hashpass,
    });
    res
      .status(200)
      .json({ message: "user registered succesfully", issuccesful: true });
    client.close();
  } else {
    res.status(201).json({ message: "req type maybe get", issuccesful: false });
  }
}
