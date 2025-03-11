import nodemailer from "nodemailer";

/* Configs - plugins */
import { envs } from "../../configs/plugins/envs.plugin";

/* Domain - repository */
import { LogRepository } from "../../domain/repository/log.repository";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachements?: Attachement[];
}
interface Attachement {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: { user: envs.MAILER_EMAIL, pass: envs.MAILER_SECRET_KEY },
  });

  constructor(private readonly logRepository: LogRepository) {}

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { htmlBody, subject, to, attachements = [] } = options;

    try {
      const sendInformation = await this.transporter.sendMail({
        to,
        subject: subject,
        html: htmlBody,
        attachments: attachements,
      });
      console.log(sendInformation);

      const log = new LogEntity({
        level: LogSeverityLevel.LOW,
        message: "Email sent",
        origin: "email.service.ts",
      });
      this.logRepository.saveLog(log);

      return true;
    } catch (error) {
      const log = new LogEntity({
        level: LogSeverityLevel.HIGH,
        message: "Email not sent",
        origin: "email.service.ts",
      });
      this.logRepository.saveLog(log);

      return false;
    }
  }

  sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = "Service logs";
    const htmlBody = `<h3>System logs - NOC </h3>`;

    const attachements: Attachement[] = [
      { filename: "ligs-all.log", path: "./logs/logs-all.log" },
      { filename: "ligs-high.log", path: "./logs/logs-high.log" },
      { filename: "ligs-medium.log", path: "./logs/logs-medium.log" },
    ];

    this.sendEmail({ to, subject, attachements, htmlBody });
  }
}
