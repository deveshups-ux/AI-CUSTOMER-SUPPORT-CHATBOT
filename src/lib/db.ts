import { connect } from "mongoose";

let mongodbUrl = process.env.MONGODB_URL;
if (!mongodbUrl) throw new Error("URL missing!");

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectDb = async () => {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = connect(mongodbUrl).then((c) => c.connection);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    throw e;
  }
  return cached.conn;
};
