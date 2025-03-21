import nodemailer from "nodemailer";

import {
  EmailService,
  SendMailOptions,
} from "../../../../presentation/email/email.service";

describe("email.service.ts", () => {
  const mockSendMail = jest.fn();

  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendMail,
  });

  const emailService = new EmailService();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should send email", async () => {
    const options: SendMailOptions = {
      to: "felix.martinezcasadiego1@gmail.com",
      subject: "Test email",
      htmlBody: "<h1>Test email</h1>",
    };

    await emailService.sendEmail(options);

    expect(mockSendMail).toHaveBeenCalledWith({
      attachments: [],
      html: "<h1>Test email</h1>",
      subject: "Test email",
      to: "felix.martinezcasadiego1@gmail.com",
    });
  });

  test("should send email with attachements", async () => {
    const email = "felix.martinezcasadiego1@gmail.com";

    await emailService.sendEmailWithFileSystemLogs(email);

    expect(mockSendMail).toHaveBeenCalledWith({
      to: email,
      subject: "Service logs",
      html: expect.any(String),
      attachments: expect.any(Array),
    });
  });
});
