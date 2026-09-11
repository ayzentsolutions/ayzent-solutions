import { MongoClient, type Db } from "mongodb";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getClientPromise() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Missing environment variable: MONGODB_URI");

  // A process can serve many requests in production too. Reusing this promise
  // prevents connection storms during serverless warm instances.
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = new MongoClient(uri, {
      maxPoolSize: 20,
      minPoolSize: 1,
      maxIdleTimeMS: 30_000,
      serverSelectionTimeoutMS: 5_000,
    }).connect();
  }
  return global._mongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const dbName = process.env.MONGODB_DB;
  if (!dbName) throw new Error("Missing environment variable: MONGODB_DB");
  const client = await getClientPromise();
  return client.db(dbName);
}
