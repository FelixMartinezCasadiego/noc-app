import mongoose from "mongoose";
import { envs } from "../../../../configs/plugins/envs.plugin";
import { MongoDatabase } from "../../../../data/mongo/init";
import { MongoLogDatasource } from "../../../../infrastructure/datasources/mongo-log.datasource";
import {
  LogEntity,
  LogSeverityLevel,
} from "../../../../domain/entities/log.entity";
import { LogModel } from "../../../../data/mongo/models/log.model";

describe("MongoLogDatasource", () => {
  const logDataSource = new MongoLogDatasource();

  const log = new LogEntity({
    origin: "mongo-log.datssource.test.ts",
    message: "test-message",
    level: LogSeverityLevel.LOW,
  });

  beforeAll(async () => {
    await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL,
    });
  });

  afterEach(async () => {
    await LogModel.deleteMany();
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  test("should create a log", async () => {
    // listen console.log with log
    const logSpy = jest.spyOn(console, "log");

    await logDataSource.saveLog(log);

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(
      "Mongo log created:",
      expect.any(String)
    );
  });

  test("should get logs", async () => {
    await logDataSource.saveLog(log);

    const logs = await logDataSource.getLogs(LogSeverityLevel.LOW);

    expect(logs.length).toBe(1);
    expect(logs[0].level).toBe(LogSeverityLevel.LOW);
  });
});
