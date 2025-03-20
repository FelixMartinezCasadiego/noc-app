import {
  LogEntity,
  LogSeverityLevel,
} from "../../../../domain/entities/log.entity";

describe("Log.entity.ts", () => {
  test("should create a LogEntity isntance", () => {
    const log = new LogEntity({
      origin: "log.entity.test.ts",
      message: "Hello world",
      level: LogSeverityLevel.HIGH,
    });

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe("Hello world");
    expect(log.level).toBe(LogSeverityLevel.HIGH);
  });

  test("should create a logEntity instance froJson", () => {
    const json = `{"message":"Service https://google.com, working","level":"low","createdAt":"2025-03-19T20:02:45.818Z","origin":"check-service.ts"}`;

    const log = LogEntity.fromJson(json);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe("Service https://google.com, working");
    expect(log.level).toBe(LogSeverityLevel.LOW);
    expect(log.origin).toBe("check-service.ts");
  });
});
