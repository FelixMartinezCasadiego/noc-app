/* Presentation */
import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";

/* Repository */
import { LogRepository } from "../../repository/log.repository";

interface SendLogEmailUSeCase {
  execute: (to: string | string[]) => Promise<boolean>;
}

export class SendEmailLogs implements SendLogEmailUSeCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository
  ) {}

  async execute(to: string | string[]) {
    try {
      const sent = await this.emailService.sendEmailWithFileSystemLogs(to);

      if (!sent) {
        throw new Error("Email log was not sent");
      }

      const log = new LogEntity({
        message: "Log email sent",
        level: LogSeverityLevel.HIGH,
        origin: "send-email.log.ts",
      });

      this.logRepository.saveLog(log);

      return true;
    } catch (error) {
      const log = new LogEntity({
        message: `${error}`,
        level: LogSeverityLevel.HIGH,
        origin: "send-email.log.ts",
      });

      this.logRepository.saveLog(log);

      return false;
    }
  }
}
