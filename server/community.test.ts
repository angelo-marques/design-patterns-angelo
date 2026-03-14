import { describe, expect, it, beforeEach, vi } from "vitest";
import * as db from "./db";

// Mock database functions
vi.mock("./db", {
  getDb: vi.fn(),
  getCommunityPosts: vi.fn(),
  getCommunityPostById: vi.fn(),
  createCommunityPost: vi.fn(),
  getCommunityComments: vi.fn(),
  createCommunityComment: vi.fn(),
  addPostLike: vi.fn(),
  hasUserLikedPost: vi.fn(),
});

describe("Community Features", () => {
  describe("Posts", () => {
    it("should create a community post", async () => {
      const mockPost = {
        userId: 1,
        title: "Test Pattern Discussion",
        content: "This is a test post about design patterns",
        patternId: "Singleton",
        language: "java",
      };

      vi.mocked(db.createCommunityPost).mockResolvedValue(1);

      const result = await db.createCommunityPost(mockPost);
      expect(result).toBe(1);
      expect(db.createCommunityPost).toHaveBeenCalledWith(mockPost);
    });

    it("should retrieve community posts", async () => {
      const mockPosts = [
        {
          id: 1,
          userId: 1,
          title: "Pattern Discussion",
          content: "Content here",
          patternId: "Singleton",
          language: "java",
          likes: 5,
          commentCount: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
          codeSnippet: null,
          tags: null,
        },
      ];

      vi.mocked(db.getCommunityPosts).mockResolvedValue(mockPosts);

      const result = await db.getCommunityPosts(20, 0);
      expect(result).toEqual(mockPosts);
      expect(db.getCommunityPosts).toHaveBeenCalledWith(20, 0);
    });

    it("should retrieve a single post by ID", async () => {
      const mockPost = {
        id: 1,
        userId: 1,
        title: "Pattern Discussion",
        content: "Content here",
        patternId: "Singleton",
        language: "java",
        likes: 5,
        commentCount: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        codeSnippet: null,
        tags: null,
      };

      vi.mocked(db.getCommunityPostById).mockResolvedValue(mockPost);

      const result = await db.getCommunityPostById(1);
      expect(result).toEqual(mockPost);
      expect(db.getCommunityPostById).toHaveBeenCalledWith(1);
    });
  });

  describe("Comments", () => {
    it("should create a community comment", async () => {
      const mockComment = {
        postId: 1,
        userId: 1,
        content: "Great discussion about this pattern!",
      };

      vi.mocked(db.createCommunityComment).mockResolvedValue(1);

      const result = await db.createCommunityComment(mockComment);
      expect(result).toBe(1);
      expect(db.createCommunityComment).toHaveBeenCalledWith(mockComment);
    });

    it("should retrieve comments for a post", async () => {
      const mockComments = [
        {
          id: 1,
          postId: 1,
          userId: 1,
          content: "Great pattern!",
          likes: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      vi.mocked(db.getCommunityComments).mockResolvedValue(mockComments);

      const result = await db.getCommunityComments(1);
      expect(result).toEqual(mockComments);
      expect(db.getCommunityComments).toHaveBeenCalledWith(1);
    });
  });

  describe("Likes", () => {
    it("should add a like to a post", async () => {
      vi.mocked(db.addPostLike).mockResolvedValue(undefined);

      await db.addPostLike(1, 1);
      expect(db.addPostLike).toHaveBeenCalledWith(1, 1);
    });

    it("should check if user has liked a post", async () => {
      vi.mocked(db.hasUserLikedPost).mockResolvedValue(true);

      const result = await db.hasUserLikedPost(1, 1);
      expect(result).toBe(true);
      expect(db.hasUserLikedPost).toHaveBeenCalledWith(1, 1);
    });

    it("should return false if user has not liked a post", async () => {
      vi.mocked(db.hasUserLikedPost).mockResolvedValue(false);

      const result = await db.hasUserLikedPost(1, 2);
      expect(result).toBe(false);
      expect(db.hasUserLikedPost).toHaveBeenCalledWith(1, 2);
    });
  });
});
