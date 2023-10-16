/* eslint-disable require-jsdoc */
import {Db, MongoClient, MongoClientOptions} from "mongodb";

const url =
  "mongodb+srv://d20_offical:Long2326@cluster0.5twts.mongodb.net/Ecom-Services";
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
