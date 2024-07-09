import { MongoClient } from 'mongodb';
const client = new MongoClient('mongodb://127.0.0.1:27017');

client.connect()
  .then(() => {
    console.log("database is connected successfully");
  })
  .catch((err) => {
    console.log("database connection is failed",err);
  });
export const db = client.db('assignment-7');