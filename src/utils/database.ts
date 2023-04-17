import { randomID } from "cath";
import { MongoClientOptions, MongoClient } from "mongodb";

interface User {
  username: string;
  key: string;
  UID: string;
}

interface Image {
  id: string;
  deleteKey: string;
}

export interface URL {
  short: string;
  full: string;
}

export interface URLModel {
  short: string;
  deleteKey: string;
}

const client = new MongoClient(
  process.env.MONGO as string,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  } as MongoClientOptions
).connect();

export default client;

export async function getUser(key: string): Promise<User | undefined> {
  const collection = (await client).db("NXC").collection("users");
  const document = await collection
    .find({ key })
    .sort({ metacritic: -1 })
    .limit(1)
    .toArray();
  if (document.length == 1) {
    return {
      username: document[0].username,
      key: document[0].key,
      UID: document[0].UID,
    };
  } else return undefined;
}

export async function getImageDeleteKey(
  deleteKey: string
): Promise<Image | undefined> {
  const collection = (await client).db("NXC").collection("images");
  const document = await collection
    .find({ deleteKey })
    .sort({ metacritic: -1 })
    .limit(1)
    .toArray();
  if (document.length == 1) {
    return {
      id: document[0].id,
      deleteKey: document[0].deleteKey,
    };
  } else return undefined;
}

export async function createImage(id: string): Promise<string> {
  const collection = (await client).db("NXC").collection("images");
  const deleteKey = randomID(40);
  await collection.insertOne({
    id,
    deleteKey,
  });
  return deleteKey;
}

export async function getFullURL(short: string): Promise<string | undefined> {
  const collection = (await client).db("NXC").collection("urls");
  const document = await collection
    .find({ short })
    .sort({ metacritic: -1 })
    .limit(1)
    .toArray();
  if (document.length == 1) {
    return document[0].full;
  } else return undefined;
}

export async function getAllURL(): Promise<URL[]> {
  const collection = (await client).db("NXC").collection("urls");
  const document = await collection.find({}).sort({ metacritic: -1 }).toArray();
  return document.map(e => {
    return { short: e.short, full: e.full };
  });
}

export async function createURL(
  short: string,
  full: string,
  user?: string
): Promise<URLModel | string> {
  const collection = (await client).db("NXC").collection("urls");
  const document = await collection
    .find({ short })
    .sort({ metacritic: -1 })
    .limit(1)
    .toArray();
  if (document.length) return "Exist";
  const deleteKey = randomID(40);
  await collection.insertOne({
    full,
    short,
    username: user ? user : "",
    deleteKey,
  });
  return { short, deleteKey };
}

export async function deleteURL(deleteKey: string): Promise<string> {
  const collection = (await client).db("NXC").collection("urls");
  const document = await collection
    .find({ deleteKey })
    .sort({ metacritic: -1 })
    .limit(1)
    .toArray();
  if (document.length == 1) {
    collection.deleteOne({ deleteKey });
    return "Sucess";
  } else return "Invalid";
}
