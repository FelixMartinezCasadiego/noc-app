/* Use cases */
import { CheckService } from "../domain/use-cases/checks/check-service";

/* Presentations */
import { CronService } from "./cron/cron-service";

export class Server {
  public static start() {
    console.log("Server started...");
    const url = "https://google.com";

    CronService.createJob("*/5 * * * * *", () => {
      new CheckService(
        () => console.log(`${url} is ok`),
        (error) => console.log(error)
      ).execute(url);
    });
  }
}
