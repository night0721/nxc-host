import * as cath from "cath";
import { MongoClientOptions, MongoClient, GridFSBucket } from "mongodb";

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

export interface Paste {
  id: string;
  value: string;
  author?: string;
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

export async function deleteImage(
  deleteKey: string
): Promise<string | undefined> {
  const collection = (await client).db("NXC").collection("photos.files");
  const document = await collection
    .find({ deleteKey })
    .sort({ metacritic: -1 })
    .limit(1)
    .toArray();
  if (document.length == 1) {
    await collection.findOneAndDelete({ deleteKey });
    return "Deleted";
  } else return undefined;
}

export async function createImage(id: string): Promise<string> {
  const collection = (await client).db("NXC").collection("photos.files");
  const document = await collection
    .find({ filename: `${id}.png` })
    .sort({ metacritic: -1 })
    .limit(1)
    .toArray();
  const deleteKey = cath.randomID(40);
  if (document.length == 1) {
    await collection.updateOne(
      { filename: `${id}.png` },
      { $set: { deleteKey } }
    );
  }
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
  const deleteKey = cath.randomID(40);
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

export async function createPaste(
  value: string,
  author?: string
): Promise<string> {
  const collection = (await client).db("NXC").collection("pastes");
  const id = cath.randomID(12);
  const deleteKey = cath.randomID(40);
  await collection.insertOne({
    id,
    value,
    author: author ? author : "",
    deleteKey,
  });
  return id;
}

export async function getPaste(id: string): Promise<Paste | undefined> {
  const collection = (await client).db("NXC").collection("pastes");
  const document = await collection
    .find({ id })
    .sort({ metacritic: -1 })
    .limit(1)
    .toArray();
  if (document.length == 1) {
    return {
      id: document[0].id,
      value: document[0].value,
      author: document[0].author ? document[0].author : "",
      deleteKey: document[0].deleteKey,
    };
  } else return undefined;
}

export async function getPasteByKey(
  deleteKey: string
): Promise<Paste | undefined> {
  const collection = (await client).db("NXC").collection("pastes");
  const document = await collection
    .find({ deleteKey })
    .sort({ metacritic: -1 })
    .limit(1)
    .toArray();
  if (document.length == 1) {
    return {
      id: document[0].id,
      value: document[0].value,
      author: document[0].author ? document[0].author : "",
      deleteKey: document[0].deleteKey,
    };
  } else return undefined;
}

export async function deletePaste(id: string): Promise<string> {
  const collection = (await client).db("NXC").collection("pastes");
  const document = await collection
    .find({ id })
    .sort({ metacritic: -1 })
    .limit(1)
    .toArray();
  if (document.length == 1) {
    await collection.deleteOne({ id });
    return "Success";
  } else return "Invalid";
}

export async function getGridFsBucket() {
  return new GridFSBucket((await client).db("NXC"), {
    bucketName: "photos",
  });
}

export async function getImageChunk(id: string) {
  const collection = (await client).db("NXC").collection("photos.chunks");
  const document = await collection
    .find({ files_id: id })
    .sort({ metacritic: -1 })
    .limit(1)
    .toArray();
  if (document.length == 1) {
    return document[0].data.toString("base64");
  } else {
    return undefined;
  }
}
