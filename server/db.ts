import { eq, and, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, files, customPatterns, InsertFile, InsertCustomPattern, communityPosts, communityComments, communityLikes, InsertCommunityPost, InsertCommunityComment, InsertCommunityLike } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// File storage queries
export async function getUserFiles(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(files).where(eq(files.userId, userId));
}

export async function getPublicFiles() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(files).where(eq(files.isPublic, 1));
}

export async function createFile(file: InsertFile): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(files).values(file);
}

export async function deleteFile(fileId: number, userId: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(files).where(and(eq(files.id, fileId), eq(files.userId, userId)));
}

export async function updateFileVisibility(fileId: number, userId: number, isPublic: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(files)
    .set({ isPublic })
    .where(and(eq(files.id, fileId), eq(files.userId, userId)));
}

// Custom patterns queries
export async function getUserPatterns(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(customPatterns).where(eq(customPatterns.userId, userId));
}

export async function getPublicPatterns() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(customPatterns).where(eq(customPatterns.isPublic, 1));
}

export async function createPattern(pattern: InsertCustomPattern): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(customPatterns).values(pattern);
}

export async function deletePattern(patternId: number, userId: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(customPatterns).where(and(eq(customPatterns.id, patternId), eq(customPatterns.userId, userId)));
}

export async function updatePatternVisibility(patternId: number, userId: number, isPublic: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(customPatterns)
    .set({ isPublic })
    .where(and(eq(customPatterns.id, patternId), eq(customPatterns.userId, userId)));
}


// Community posts queries
export async function getCommunityPosts(limit: number = 20, offset: number = 0) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(communityPosts).orderBy(desc(communityPosts.createdAt)).limit(limit).offset(offset);
}

export async function getCommunityPostsByPattern(patternId: string, limit: number = 10) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(communityPosts)
    .where(eq(communityPosts.patternId, patternId))
    .orderBy(desc(communityPosts.createdAt))
    .limit(limit);
}

export async function getCommunityPostById(postId: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(communityPosts).where(eq(communityPosts.id, postId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function createCommunityPost(post: InsertCommunityPost): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(communityPosts).values(post);
  return result.insertId;
}

export async function updateCommunityPost(postId: number, userId: number, updates: Partial<InsertCommunityPost>): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(communityPosts)
    .set(updates)
    .where(and(eq(communityPosts.id, postId), eq(communityPosts.userId, userId)));
}

export async function deleteCommunityPost(postId: number, userId: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(communityPosts).where(and(eq(communityPosts.id, postId), eq(communityPosts.userId, userId)));
}

export async function incrementPostLikes(postId: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const post = await getCommunityPostById(postId);
  if (post) {
    await db.update(communityPosts)
      .set({ likes: (post.likes || 0) + 1 })
      .where(eq(communityPosts.id, postId));
  }
}

// Community comments queries
export async function getCommunityComments(postId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(communityComments)
    .where(eq(communityComments.postId, postId))
    .orderBy(desc(communityComments.createdAt));
}

export async function createCommunityComment(comment: InsertCommunityComment): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(communityComments).values(comment);
  
  // Increment comment count on post
  const post = await getCommunityPostById(comment.postId);
  if (post) {
    await db.update(communityPosts)
      .set({ commentCount: (post.commentCount || 0) + 1 })
      .where(eq(communityPosts.id, comment.postId));
  }
  
  return result.insertId;
}

export async function deleteCommunityComment(commentId: number, userId: number, postId: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  // Decrement comment count on post
  const post = await getCommunityPostById(postId);
  if (post) {
    await db.update(communityPosts)
      .set({ commentCount: Math.max(0, (post.commentCount || 0) - 1) })
      .where(eq(communityPosts.id, postId));
  }
  
  await db.delete(communityComments)
    .where(and(eq(communityComments.id, commentId), eq(communityComments.userId, userId)));
}

// Community likes queries
export async function addPostLike(userId: number, postId: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  // Check if already liked
  const existing = await db.select().from(communityLikes)
    .where(and(eq(communityLikes.userId, userId), eq(communityLikes.postId, postId)))
    .limit(1);
  
  if (existing.length === 0) {
    await db.insert(communityLikes).values({ userId, postId });
    await incrementPostLikes(postId);
  }
}

export async function removePostLike(userId: number, postId: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(communityLikes)
    .where(and(eq(communityLikes.userId, userId), eq(communityLikes.postId, postId)));
  
  const post = await getCommunityPostById(postId);
  if (post) {
    await db.update(communityPosts)
      .set({ likes: Math.max(0, (post.likes || 0) - 1) })
      .where(eq(communityPosts.id, postId));
  }
}

export async function hasUserLikedPost(userId: number, postId: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  
  const result = await db.select().from(communityLikes)
    .where(and(eq(communityLikes.userId, userId), eq(communityLikes.postId, postId)))
    .limit(1);
  
  return result.length > 0;
}
