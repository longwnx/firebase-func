import {Db, MongoClient} from "mongodb";
import dotenv from "dotenv";

const result2 = dotenv.config();
if (result2.error) {
  throw result2.error;
}
const url = `${process.env.MONGODB_URL}`;
const options = {}; // Add your options here

/**
 * Database class to handle MongoDB connections.
 */
class Database {
  private static instance: Database;
  public db?: Db;
  private client: MongoClient;

  /**
   * Private constructor for the Database class.
   */
  private constructor() {
    this.client = new MongoClient(url, options);
    this.connect();
  }

  /**
   * Get the instance of the Database class.
   * @return {Database} The instance of the Database class.
   */
  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  /**
   * Connect to the MongoDB database.
   */
  private async connect(): Promise<void> {
    try {
      await this.client.connect();
      console.log("Connected to MongoDB!");
      this.db = this.client.db();
    } catch (error) {
      console.error(`Error connecting to MongoDB: ${error}`);
    }
  }
}

const databaseInstance = Database.getInstance();
export default databaseInstance;
