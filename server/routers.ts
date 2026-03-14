import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { storagePut } from "./storage";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  files: router({
    list: protectedProcedure.query(({ ctx }) => db.getUserFiles(ctx.user.id)),
    listPublic: publicProcedure.query(() => db.getPublicFiles()),
    upload: protectedProcedure
      .input(z.object({
        fileName: z.string(),
        fileContent: z.string(),
        mimeType: z.string(),
        description: z.string().optional(),
        category: z.string().optional(),
        isPublic: z.boolean().default(false),
      }))
      .mutation(async ({ ctx, input }) => {
        const buffer = Buffer.from(input.fileContent, 'base64');
        const fileKey = `${ctx.user.id}-files/${Date.now()}-${input.fileName}`;
        const { url } = await storagePut(fileKey, buffer, input.mimeType);

        await db.createFile({
          userId: ctx.user.id,
          fileName: input.fileName,
          fileKey,
          url,
          mimeType: input.mimeType,
          fileSize: buffer.length,
          description: input.description,
          category: input.category,
          isPublic: input.isPublic ? 1 : 0,
        });

        return { url, fileKey };
      }),
    delete: protectedProcedure
      .input(z.object({ fileId: z.number() }))
      .mutation(({ ctx, input }) => db.deleteFile(input.fileId, ctx.user.id)),
    togglePublic: protectedProcedure
      .input(z.object({ fileId: z.number(), isPublic: z.boolean() }))
      .mutation(({ ctx, input }) => db.updateFileVisibility(input.fileId, ctx.user.id, input.isPublic ? 1 : 0)),
  }),

  patterns: router({
    list: protectedProcedure.query(({ ctx }) => db.getUserPatterns(ctx.user.id)),
    listPublic: publicProcedure.query(() => db.getPublicPatterns()),
    create: protectedProcedure
      .input(z.object({
        name: z.string(),
        description: z.string().optional(),
        intent: z.string().optional(),
        problem: z.string().optional(),
        solution: z.string().optional(),
        codeExamples: z.string().optional(),
        tags: z.string().optional(),
        isPublic: z.boolean().default(false),
      }))
      .mutation(({ ctx, input }) => db.createPattern({
        userId: ctx.user.id,
        name: input.name,
        description: input.description,
        intent: input.intent,
        problem: input.problem,
        solution: input.solution,
        codeExamples: input.codeExamples,
        tags: input.tags,
        isPublic: input.isPublic ? 1 : 0,
      })),
    delete: protectedProcedure
      .input(z.object({ patternId: z.number() }))
      .mutation(({ ctx, input }) => db.deletePattern(input.patternId, ctx.user.id)),
    togglePublic: protectedProcedure
      .input(z.object({ patternId: z.number(), isPublic: z.boolean() }))
      .mutation(({ ctx, input }) => db.updatePatternVisibility(input.patternId, ctx.user.id, input.isPublic ? 1 : 0)),
  }),
});

export type AppRouter = typeof appRouter;
