/* eslint-disable require-jsdoc */
import {Db, MongoClient, MongoClientOptions} from "mongodb";
import dotenv from "dotenv";

const result2 = dotenv.config();
if (result2.error) {
  throw result2.error;
}
const url = `${process.env.MONGODB_URL}`;
const options: MongoClientOptions = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  //
};

class Database {
  private static instance: Database;
  public db?: Db;
  private client: MongoClient;

  private constructor() {
    this.client = new MongoClient(url, options);
    this.connect();
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  private async connect() {
    try {
      await this.client.connect();
      console.log("Connected to MongoDB!");
      this.db = this.client.db();
    } catch (error) {
      throw new Error(`Error connecting to MongoDB: ${error}`);
    }
  }
}

export default Database.getInstance();
