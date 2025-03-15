import { CronService } from "./cron/cron-service";
import { envs } from "../configs/plugins/envs.plugin";

/* Use cases - checks */
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";

/* Infrastructure - datasources */
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
/* Infrastructure - repositories */
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";

/* Presentations */
import { EmailService } from "./email/email.service";

// Variable to change the repositories
const LogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
  // new MongoLogDatasource()
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

    // const url = "https://google.com";

    // CronService.createJob("*/5 * * * * *", () => {
    //   new CheckService(
    //     LogRepository,
    //     () => console.log(`${url} is ok`),
    //     (error) => console.log(error)
    //   ).execute(url);

    //   // new CheckService().execute("http://localhost:3000")
    // });
  }
}
