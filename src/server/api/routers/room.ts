import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const roomRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.room.findMany();
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
});
