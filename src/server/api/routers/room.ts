import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const roomRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.room.findMany({
      include: {
        playerOne: true,
        playerTwo: true,
      },
    });
  }),

  createNew: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.room.create({
        data: {
          name: input.name,
        },
      });
    }),

  join: protectedProcedure
    .input(z.object({ roomId: z.string(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const room = await ctx.prisma.room.findUnique({
        where: {
          id: input.roomId,
        },
      });

      if (!room?.playerOneId) {
        return ctx.prisma.room.update({
          where: {
            id: input.roomId,
          },
          data: {
            playerOneId: input.userId,
          },
        });
      } else {
        return ctx.prisma.room.update({
          where: {
            id: input.roomId,
          },
          data: {
            playerTwoId: input.userId,
          },
        });
      }
    }),

  getRoomHistory: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return ctx.prisma.roomHistory.findMany({
        where: {
          roomId: input,
        },
      });
    }),

  play: protectedProcedure
    .input(
      z.object({
        roomId: z.string(),
        positionX: z.number(),
        positionY: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const histories = await ctx.prisma.roomHistory.findMany({
        where: {
          roomId: input.roomId,
        },
      });

      const numRound = histories.length;
      if (numRound >= 9) {
        return;
      }

      return ctx.prisma.roomHistory.create({
        data: {
          roomId: input.roomId,
          round: numRound + 1,
          positionX: input.positionX,
          positionY: input.positionY,
        },
      });
    }),
});
