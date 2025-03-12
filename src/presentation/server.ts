/* Use cases - checks */
import { envs } from "../configs/plugins/envs.plugin";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";

/* Infrastructure - datasources */
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
/* Infrastructure - repositories */
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";

/* Presentations */
import { EmailService } from "./email/email.service";

// Variable to change the repositories
const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);

const emailService = new EmailService();

export class Server {
  public static start() {
    console.log("Server started...");

    // Send email
    new SendEmailLogs(emailService, fileSystemLogRepository).execute([
      envs.MAILER_EMAIL,
    ]);

    // emailService.sendEmailWithFileSystemLogs([envs.MAILER_EMAIL]);
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
