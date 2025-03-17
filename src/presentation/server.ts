import { CronService } from "./cron/cron-service";
import { envs } from "../configs/plugins/envs.plugin";

/* Use cases - checks */
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";

/* Infrastructure - datasources */
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";

/* Infrastructure - repositories */
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";

/* Presentations */
import { EmailService } from "./email/email.service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";

// Variable to change the repositories
const fsLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
  // new MongoLogDatasource()
  // new PostgresLogDatasource()
);
const mongoLogRepository = new LogRepositoryImpl(new MongoLogDatasource());
const postgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDatasource()
);

// const emailService = new EmailService();

export class Server {
  public static start() {
    console.log("Server started...");

    // Send email
    // new SendEmailLogs(emailService, fileSystemLogRepository).execute([
    //   envs.MAILER_EMAIL,
    // ]);

    // emailService.sendEmailWithFileSystemLogs([envs.MAILER_EMAIL]);
    // emailService.sendEmail({
    //   to: envs.MAILER_EMAIL,
    //   subject: "System logs",
    //   htmlBody: `<h3>System logs - NOC </h3>`,
    // });

    const url = "https://google.com";

    CronService.createJob("*/5 * * * * *", () => {
      // new CheckService(
      new CheckServiceMultiple(
        [fsLogRepository, mongoLogRepository, postgresLogRepository],
        () => console.log(`${url} is ok`),
        (error) => console.log(error)
      ).execute(url);

      // new CheckService().execute("http://localhost:3000")
    });
  }
}
