import {
  LogEntity,
  LogSeverityLevel,
} from "../../../../domain/entities/log.entity";
import { LogRepositoryImpl } from "../../../../infrastructure/repositories/log.repository.impl";

describe("LogRepositoryImpl", () => {
  const mockLogDatasource = { saveLog: jest.fn(), getLogs: jest.fn() };
  const logRepositoryImpl = new LogRepositoryImpl(mockLogDatasource);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("saveLog should call the datasource with arguments", async () => {
    const log = {
      level: LogSeverityLevel.HIGH,
      message: "test message",
      origin: "test origin",
    } as LogEntity;

    await logRepositoryImpl.saveLog(log);
  });

  test("getLogs should call the datasource with arguments", async () => {
    await logRepositoryImpl.getLogs(LogSeverityLevel.HIGH);
  });
});
