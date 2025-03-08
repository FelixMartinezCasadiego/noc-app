/* Domain - Datasource */
import { LogDatasource } from "../../domain/datasources/log.datasource";

/* Domain - Entities */
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

/* Domain - Repository */
import { LogRepository } from "../../domain/repository/log.repository";

export class LogRepositoryImpl implements LogRepository {
  // Any datasource
  private logDatasource: LogDatasource;

  constructor(logDatasource: LogDatasource) {
    this.logDatasource = logDatasource;
  }

  async saveLog(log: LogEntity): Promise<void> {
    return this.logDatasource.saveLog(log);
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    return this.logDatasource.getLogs(severityLevel);
  }
}
