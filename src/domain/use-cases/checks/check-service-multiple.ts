/* Entities */
import {
  LogEntity,
  LogEntityOptions,
  LogSeverityLevel,
} from "../../entities/log.entity";

/* Repository */
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceMultipleUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {
  private readonly successCallback: SuccessCallback;
  private readonly errorCallback: ErrorCallback;
  private readonly logRepository: LogRepository[];

  constructor(
    logRepository: LogRepository[],
    successCallback: SuccessCallback,
    errorCallback: ErrorCallback
  ) {
    this.logRepository = logRepository;
    this.successCallback = successCallback;
    this.errorCallback = errorCallback;
  }

  private callLogsRepository(log: LogEntity) {
    this.logRepository.forEach((logRepository) => logRepository.saveLog(log));
  }

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);

      if (!req.ok) throw new Error(`Error on check service ${url}`);

      const logOptions: LogEntityOptions = {
        message: `Service ${url}, working`,
        level: LogSeverityLevel.LOW,
        origin: "check-service.ts",
        createdAt: new Date(),
      };

      const log = new LogEntity(logOptions);
      this.callLogsRepository(log);

      this.successCallback && this.successCallback();
      return true;
    } catch (error) {
      const errorMessage = `${url} is not ok. ${error}`;

      const logOptionsCatch: LogEntityOptions = {
        message: errorMessage,
        level: LogSeverityLevel.HIGH,
        origin: "check-service.ts",
        createdAt: new Date(),
      };

      const log = new LogEntity(logOptionsCatch);
      this.callLogsRepository(log);

      this.errorCallback && this.errorCallback(`${errorMessage}`);

      return false;
    }
  }
}
