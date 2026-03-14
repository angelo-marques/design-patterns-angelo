import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * File storage table for user uploads
 * Stores metadata about files uploaded by users
 */
export const files = mysqlTable("files", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  fileName: varchar("fileName", { length: 255 }).notNull(),
  fileKey: varchar("fileKey", { length: 512 }).notNull().unique(),
  url: text("url").notNull(),
  mimeType: varchar("mimeType", { length: 100 }),
  fileSize: int("fileSize"),
  description: text("description"),
  category: varchar("category", { length: 50 }), // 'code', 'documentation', 'example', etc
  isPublic: int("isPublic").default(0), // 0 = private, 1 = public
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type File = typeof files.$inferSelect;
export type InsertFile = typeof files.$inferInsert;

/**
 * Custom design patterns table
 * Allows users to save and share their own design patterns
 */
export const customPatterns = mysqlTable("customPatterns", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  intent: text("intent"),
  problem: text("problem"),
  solution: text("solution"),
  codeExamples: text("codeExamples"), // JSON string with code examples
  tags: varchar("tags", { length: 500 }), // comma-separated tags
  isPublic: int("isPublic").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CustomPattern = typeof customPatterns.$inferSelect;
export type InsertCustomPattern = typeof customPatterns.$inferInsert;

/**
 * Community posts table
 * Allows users to share pattern discussions and insights
 */
export const communityPosts = mysqlTable("communityPosts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  patternId: varchar("patternId", { length: 100 }), // Reference to pattern name (e.g., "Singleton")
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  codeSnippet: text("codeSnippet"), // Optional code example
  language: varchar("language", { length: 50 }), // java, csharp, python, ruby
  tags: varchar("tags", { length: 500 }), // comma-separated tags
  likes: int("likes").default(0),
  commentCount: int("commentCount").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CommunityPost = typeof communityPosts.$inferSelect;
export type InsertCommunityPost = typeof communityPosts.$inferInsert;

/**
 * Community comments table
 * Allows users to discuss posts
 */
export const communityComments = mysqlTable("communityComments", {
  id: int("id").autoincrement().primaryKey(),
  postId: int("postId").notNull(),
  userId: int("userId").notNull(),
  content: text("content").notNull(),
  likes: int("likes").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CommunityComment = typeof communityComments.$inferSelect;
export type InsertCommunityComment = typeof communityComments.$inferInsert;

/**
 * Community likes table
 * Tracks user likes on posts and comments
 */
export const communityLikes = mysqlTable("communityLikes", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  postId: int("postId"), // null if liking a comment
  commentId: int("commentId"), // null if liking a post
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type CommunityLike = typeof communityLikes.$inferSelect;
export type InsertCommunityLike = typeof communityLikes.$inferInsert;
