import { PrismaClient } from "@prisma/client";

// https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices

declare const global: typeof globalThis & { prisma?: PrismaClient };

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export { prisma };
