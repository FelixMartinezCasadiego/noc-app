/* Use cases - checks */
import { CheckService } from "../domain/use-cases/checks/check-service";

/* Infrastructure - datasources */
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
/* Infrastructure - repositories */
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";

/* Presentations */
import { CronService } from "./cron/cron-service";

// Variable to change the repositories
const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);

export class Server {
  public static start() {
    console.log("Server started...");

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
