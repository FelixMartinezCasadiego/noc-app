import fs from "fs";

/* Domain - Datasources */
import { LogDatasource } from "../../domain/datasources/log.datasource";

/* Domain - Entities */
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDatasource implements LogDatasource {
  private readonly logPath = "logs/";
  private readonly allLogsPath = "logs/logs-all.log";
  private readonly mediumLogsPath = "logs/logs-medium.log";
  private readonly highLogsPath = "logs/logs-high.log";

  constructor() {
    this.createLogsFiles();
  }

  private createLogsFiles = () => {
    // Check logPath
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    // Create paths
    [this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(
      (path) => {
        if (fs.existsSync(path)) return;

        fs.writeFileSync(path, "");
      }
    );
  };

  async saveLog(newLog: LogEntity): Promise<void> {
    const logAsJson = `${JSON.stringify(newLog)}\n`;

    fs.appendFileSync(this.allLogsPath, logAsJson);

    if (newLog.level === LogSeverityLevel.LOW) return;

    if (newLog.level === LogSeverityLevel.MEDIUM) {
      fs.appendFileSync(this.mediumLogsPath, logAsJson);
    } else {
      fs.appendFileSync(this.highLogsPath, logAsJson);
    }
  }

  private getLogsFromFile = (path: string): LogEntity[] => {
    const content = fs.readFileSync(path, "utf-8");
    const stringLogs = content
      .split("\n")
      .map((log) => LogEntity.fromJson(log));

    return stringLogs;
  };

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    switch (severityLevel) {
      case LogSeverityLevel.LOW:
        return this.getLogsFromFile(this.allLogsPath);
      case LogSeverityLevel.MEDIUM:
        return this.getLogsFromFile(this.mediumLogsPath);
      case LogSeverityLevel.HIGH:
        return this.getLogsFromFile(this.highLogsPath);

      default:
        throw new Error(`${severityLevel} not implemented`);
    }
  }
}
