import { CheckService } from "../../../../../domain/use-cases/checks/check-service";

describe("CheckService.ts", () => {
  const mockRepository = { saveLog: jest.fn(), getLogs: jest.fn() };
  const successCallback = jest.fn();
  const errorCallback = jest.fn();

  const checkSerevice = new CheckService(
    mockRepository,
    successCallback,
    errorCallback
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should call successCallback when fetch returns true", async () => {
    const wasOk = await checkSerevice.execute("https://google.com");

    expect(wasOk).toBe(true);
    expect(successCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();
  });

  test("should call successCallback when fetch returns false", async () => {
    const wasOk = await checkSerevice.execute("https://googlasdasdae.com");

    expect(wasOk).toBe(false);
    expect(successCallback).not.toHaveBeenCalled();
    expect(errorCallback).toHaveBeenCalled();
  });
});
