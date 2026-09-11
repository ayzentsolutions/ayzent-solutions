import { MongoClient, type Db } from "mongodb";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
  var _mongoIndexesPromise: Promise<void> | undefined;
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
  const client = await getClientPromise().catch((error) => { global._mongoClientPromise = undefined; throw error; });
  const db = client.db(dbName);
  if (!global._mongoIndexesPromise) global._mongoIndexesPromise = Promise.all([
    ...["projects", "products", "posts", "categories", "tags"].map((name) => db.collection(name).createIndex({ slug: 1 }, { unique: true, sparse: true })),
    ...["services", "projects", "products", "posts", "team", "testimonials", "announcements", "jobs", "clientLogos"].map((name) => db.collection(name).createIndex({ status: 1, displayOrder: 1, createdAt: -1 })),
    db.collection("adminUsers").createIndex({ email: 1 }, { unique: true }),
    db.collection("newsletterSubscribers").createIndex({ email: 1 }, { unique: true }),
    db.collection("loginAttempts").createIndex({ createdAt: 1 }, { expireAfterSeconds: 900 }),
    db.collection("inquiries").createIndex({ createdAt: -1 }),
  ]).then(() => undefined);
  await global._mongoIndexesPromise;
  return db;
}
