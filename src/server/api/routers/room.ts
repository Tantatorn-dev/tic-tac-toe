import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const roomRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.room.findMany({
      include: {
        playerOne: true,
        playerTwo: true
      },
    });
  }),

  createNew: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.room.create({
        data: {
          name: input.name,
        },
      });
    }),

  join: publicProcedure
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
});
