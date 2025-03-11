/* Use cases - checks */
import { envs } from "../configs/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/check-service";

/* Infrastructure - datasources */
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
/* Infrastructure - repositories */
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";

/* Presentations */
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

// Variable to change the repositories
const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);

export class Server {
  public static start() {
    console.log("Server started...");

    // Send email
    const emailService = new EmailService(fileSystemLogRepository);
    emailService.sendEmailWithFileSystemLogs([envs.MAILER_EMAIL]);
    // emailService.sendEmail({
    //   to: envs.MAILER_EMAIL,
    //   subject: "System logs",
    //   htmlBody: `<h3>System logs - NOC </h3>`,
    // });

    // const url = "https://google.com";

    // CronService.createJob("*/5 * * * * *", () => {
    //   new CheckService(
    //     fileSystemLogRepository,
    //     () => console.log(`${url} is ok`),
    //     (error) => console.log(error)
    //   ).execute(url);

    //   // new CheckService().execute("http://localhost:3000")
    // });
  }
}
