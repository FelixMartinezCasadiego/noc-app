import { PrismaClient, SeverityLevel } from "@prisma/client";

/* Domain - datasource */
import { LogDatasource } from "../../domain/datasources/log.datasource";

/* Domain - entities */
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const prismaClient = new PrismaClient();

const severityEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
};

export class PostgresLogDatasource implements LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    const level = severityEnum[log.level];

    await prismaClient.logModel.create({
      data: { ...log, level },
    });

    console.log("Posgres save");
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const level = severityEnum[severityLevel];

    const dbLogs = await prismaClient.logModel.findMany({
      where: { level },
    });

    return dbLogs.map((dblog) => LogEntity.fromObject(dblog));
  }
}
