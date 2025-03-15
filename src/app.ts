import { PrismaClient } from "@prisma/client";

/* Presentation */
import { Server } from "./presentation/server";

/* Data - Mongo */
import { MongoDatabase } from "./data/mongo/init";
import { LogModel } from "./data/mongo/models/log.model";

/* Configs - Plugins */
import { envs } from "./configs/plugins/envs.plugin";

(async () => {
  main();
})();

async function main() {
  await MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL,
  });

  const prisma = new PrismaClient();
  const newLog = await prisma.logModel.create({
    data: { level: "HIGH", message: "Test message", origin: "App.ts" },
  });

  console.log(newLog);

  // Create a collection = tables, document = register
  /* const newLog = await LogModel.create({
    message: "Test message from Mongo",
    origin: "App.ts",
    level: "LOW",
  });

  await newLog.save();
  console.log(newLog); */

  // const logs = await LogModel.find();
  // console.log(logs);
  // Server.start();
}
