import { prisma } from "./lib/prisma";
import Fastify from "fastify"
import { userRoutes } from "./routes/users";
import { serverRoutes } from "./routes/servers";
import { serviceRoutes } from "./routes/services";

const allUsers = await prisma.user.findMany();
console.log("All users:", JSON.stringify(allUsers, null, 2));

const app = Fastify({
  logger: true
})

app.get('/', async function (request, reply) {
  reply.send({ hello: 'world' })
})

app.register(userRoutes)
app.register(serverRoutes)
app.register(serviceRoutes)

const start = async () => {
  try {
    await app.listen({
      port: 3000,
      host: "0.0.0.0",
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
// async function main() {
//   // const user = await prisma.user.create({
//   //   data: {
//   //     email: "test@test.de",
//   //     passwordHash: "dummy",
//   //     servers: {
//   //       create: {
//   //         name: "Kellner",
//   //         ipAddress: "123.123.123.123",
//   //         description: "Setup via code"
//   //       }
//   //     }
//   //   },
//   //   include: {
//   //     servers: true
//   //   }
//   // });

//   // console.log(user);

//   // const allUsers = await prisma.user.findMany({
//   //   include: {
//   //     servers: true,
//   //   },
//   // });
//   // console.log("All users:", JSON.stringify(allUsers, null, 2));
//   await prisma.user.update({
//     where: { email: "test@test.de" },
//     data: {
//       passwordHash: "ymmud"
//     }
//   })

//   const user = await prisma.user.findUnique({
//     where: { email: "test@test.de" },
//   });

//   console.log("All users:", JSON.stringify(user, null, 2));
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });


// function prismaUpdate() {
//   prisma.user.update({
//     where: { email: "test@test.de" },
//     data: {
//       passwordHash: "ymmud"
//     }
//   })
// }