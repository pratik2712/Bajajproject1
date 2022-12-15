import { MongoClient } from "mongodb";

export async function connecttodatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://rana:rana@cluster0.pfohguj.mongodb.net/?retryWrites=true&w=majority"
  );
  return client;
}
