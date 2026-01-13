import { db } from "./db";
import {
  subscribers,
  type InsertSubscriber,
  type Subscriber,
} from "@shared/schema";

export interface IStorage {
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
}

export class DatabaseStorage implements IStorage {
  async createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    if (!db) {
      throw new Error("Database is not configured. Please set DATABASE_URL in your .env file.");
    }
    const [subscriber] = await db
      .insert(subscribers)
      .values(insertSubscriber)
      .returning();
    return subscriber;
  }
}

export const storage = new DatabaseStorage();
