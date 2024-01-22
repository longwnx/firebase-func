import {MongoClient} from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const url = String(process.env.MONGODB_URL);
const options = {}; // Các tùy chọn (nếu có)

/**
 * Lớp Database để xử lý kết nối với MongoDB.
 */
class Database {
  private static instance: Database;
  private client: MongoClient;

  // Constructor riêng tư
  // eslint-disable-next-line require-jsdoc
  private constructor() {
    this.client = new MongoClient(url, options);
    this.connect();
  }

  // Lấy thực thể của lớp Database
  // eslint-disable-next-line require-jsdoc
  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  // Lấy đối tượng Db
  // eslint-disable-next-line require-jsdoc
  public getDb() {
    return this.client.db();
  }

  // Kết nối với cơ sở dữ liệu MongoDB
  // eslint-disable-next-line require-jsdoc
  private async connect(): Promise<void> {
    try {
      await this.client.connect();
      console.log("Connected to MongoDB!");
    } catch (error) {
      console.error(`Error connecting to MongoDB: ${error}`);
    }
  }
}

// Xuất khẩu một thực thể của Database
export default Database.getInstance();
