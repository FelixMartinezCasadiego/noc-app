import { LogDatasource } from "../../../../domain/datasources/log.datasource";
import {
  LogEntity,
  LogSeverityLevel,
} from "../../../../domain/entities/log.entity";

describe("Log.datasource.ts", () => {
  const newLog = new LogEntity({
    origin: "log.datasource.test.ts",
    message: "test-message",
    level: LogSeverityLevel.LOW,
  });

  class MockLogDatasource implements LogDatasource {
    async saveLog(log: LogEntity): Promise<void> {
      return;
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
      return [newLog];
    }
  }

  test("should test the abstract class", async () => {
    const mockDatasource = new MockLogDatasource();

    expect(mockDatasource).toBeInstanceOf(MockLogDatasource);
    expect(mockDatasource).toHaveProperty("saveLog");
    expect(typeof mockDatasource.saveLog).toBe("function");
    expect(mockDatasource).toHaveProperty("getLogs");

    await mockDatasource.saveLog(newLog);
    const logs = await mockDatasource.getLogs(LogSeverityLevel.HIGH);
    expect(logs).toHaveLength(1);
  });
});
