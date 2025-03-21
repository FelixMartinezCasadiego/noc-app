import fs from "fs";
import path from "path";

import { FileSystemDatasource } from "../../../../infrastructure/datasources/file-system.datasource";
import {
  LogEntity,
  LogSeverityLevel,
} from "../../../../domain/entities/log.entity";

describe("FileSystemDatasource", () => {
  const logPath = path.join(__dirname, "../../../../../logs");

  beforeEach(() => {
    fs.rmSync(logPath, { recursive: true, force: true });
  });

  test("should create log files if they do not exist", () => {
    new FileSystemDatasource();

    const files = fs.readdirSync(logPath);

    expect(files).toEqual(["logs-all.log", "logs-high.log", "logs-medium.log"]);
  });

  test("should save a log in logs-all.log", () => {
    const logDatasource = new FileSystemDatasource();
    const log = new LogEntity({
      message: "test",
      level: LogSeverityLevel.LOW,
      origin: "file-system.datasource.test.ts",
    });

    logDatasource.saveLog(log);
    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, "utf-8");

    expect(allLogs).toContain(JSON.stringify(log));
  });

  test("should save a log in logs-medium.log", () => {
    const logDatasource = new FileSystemDatasource();
    const log = new LogEntity({
      message: "test",
      level: LogSeverityLevel.MEDIUM,
      origin: "file-system.datasource.test.ts",
    });

    logDatasource.saveLog(log);
    const allLogs = fs.readFileSync(`${logPath}/logs-medium.log`, "utf-8");

    expect(allLogs).toContain(JSON.stringify(log));
  });

  test("should save a log in logs-high.log", () => {
    const logDatasource = new FileSystemDatasource();
    const log = new LogEntity({
      message: "test",
      level: LogSeverityLevel.HIGH,
      origin: "file-system.datasource.test.ts",
    });

    logDatasource.saveLog(log);
    const allLogs = fs.readFileSync(`${logPath}/logs-high.log`, "utf-8");

    expect(allLogs).toContain(JSON.stringify(log));
  });

  test("should return all logs", async () => {
    const logDatasource = new FileSystemDatasource();
    const logHigh = new LogEntity({
      message: "test-high",
      level: LogSeverityLevel.HIGH,
      origin: "file-system.datasource.test.ts",
    });

    const logMedium = new LogEntity({
      message: "test-medium",
      level: LogSeverityLevel.MEDIUM,
      origin: "file-system.datasource.test.ts",
    });

    const logLow = new LogEntity({
      message: "test-low",
      level: LogSeverityLevel.LOW,
      origin: "file-system.datasource.test.ts",
    });

    logDatasource.saveLog(logHigh);
    logDatasource.saveLog(logMedium);
    logDatasource.saveLog(logLow);

    const logsLow = await logDatasource.getLogs(LogSeverityLevel.LOW);
    const logsMedium = await logDatasource.getLogs(LogSeverityLevel.MEDIUM);
    const logsHigh = await logDatasource.getLogs(LogSeverityLevel.HIGH);

    expect(logsLow).toEqual(
      expect.arrayContaining([logLow, logMedium, logHigh])
    );
    expect(logsMedium).toEqual(expect.arrayContaining([logMedium]));
    expect(logsHigh).toEqual(expect.arrayContaining([logHigh]));
  });
});
