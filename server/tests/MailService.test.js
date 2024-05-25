const nodemailer = require("nodemailer");
const MailService = require("../service/mailService");

jest.mock("nodemailer");

describe("MailService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("sendActivationMail", () => {
    it("should send activation mail", async () => {
      const mockTransporter = {
        sendMail: jest.fn().mockResolvedValueOnce({}),
      };

      MailService.transporter = mockTransporter;

      const to = "test@example.com";
      const link = "http://example.com/activate";
      await MailService.sendActivationMail(to, link);

      expect(mockTransporter.sendMail).toHaveBeenCalledTimes(1);
      expect(mockTransporter.sendMail).toHaveBeenCalledWith({
        from: process.env.SMTP_USER,
        to,
        subject: "Account activation on" + process.env.API_URL,
        text: "",
        html: `
              <div>
                  <h1>Click on link for activation</h1>
                  <a href="${link}">${link}</a>
              </div>
            `,
      });
    });
  });
});
