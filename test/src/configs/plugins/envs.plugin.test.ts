import { envs } from "../../../../src/configs/plugins/envs.plugin";

describe("EnvsPlugin", () => {
  test("should return env options", () => {
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_EMAIL: "felix.martinezcasadiego@gmail.com",
      MAILER_SECRET_KEY: "zosvhgdxmtknzvyd",
      MAILER_SERVICE: "gmail",
      MONGO_URL: "mongodb://felix:123456789@localhost:27017/",
      MONGO_DB_NAME: "NOC-TEST",
      MONGO_USER: "felix",
      MONGO_PASS: "123456789",
    });
  });

  test("should return error if not found env", async () => {
    jest.resetModules();
    process.env.PORT = "ABC";

    try {
      await import("../../../../src/configs/plugins/envs.plugin");

      expect(true).toBe(false);
    } catch (error) {
      expect(`${error}`).toContain('"PORT" should be a valid integer');
    }
  });
});
