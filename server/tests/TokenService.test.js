const jwt = require("jsonwebtoken");
const TokenService = require("../service/tokenService");
const ApiError = require("../error/ApiError");
const { User } = require("../models/models");

jest.mock("jsonwebtoken");
jest.mock("../models/models");

describe("TokenService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("generateToken", () => {
    it("should generate access and refresh tokens", () => {
      const payload = { userId: 1 };
      const mockAccessToken = "mock-access-token";
      const mockRefreshToken = "mock-refresh-token";
      jwt.sign.mockReturnValueOnce(mockAccessToken);
      jwt.sign.mockReturnValueOnce(mockRefreshToken);

      const tokens = TokenService.generateToken(payload);

      expect(jwt.sign).toHaveBeenCalledTimes(2);
      expect(jwt.sign).toHaveBeenCalledWith(
        payload,
        process.env.JWT_ACCESS_SECRET,
        {
          expiresIn: "30m",
        }
      );
      expect(jwt.sign).toHaveBeenCalledWith(
        payload,
        process.env.JWT_REFRESH_SECRET,
        {
          expiresIn: "30d",
        }
      );

      expect(tokens).toEqual({
        accessToken: mockAccessToken,
        refreshToken: mockRefreshToken,
      });
    });
  });

  describe("validateToken", () => {
    it("should return user data if token is valid", () => {
      const token = "valid-token";
      const userData = { userId: 1 };
      jwt.verify.mockReturnValueOnce(userData);

      const result = TokenService.validateToken(token);

      expect(jwt.verify).toHaveBeenCalledTimes(1);
      expect(jwt.verify).toHaveBeenCalledWith(
        token,
        process.env.JWT_ACCESS_SECRET
      );
      expect(result).toEqual(userData);
    });

    it("should return null if token is invalid", () => {
      const token = "invalid-token";
      jwt.verify.mockImplementationOnce(() => {
        throw new Error();
      });

      const result = TokenService.validateToken(token);

      expect(jwt.verify).toHaveBeenCalledTimes(1);
      expect(jwt.verify).toHaveBeenCalledWith(
        token,
        process.env.JWT_ACCESS_SECRET
      );
      expect(result).toBeNull();
    });
  });

  describe("validateRefreshToken", () => {
    it("should return user data if refresh token is valid", () => {
      const token = "valid-refresh-token";
      const userData = { userId: 1 };
      jwt.verify.mockReturnValueOnce(userData);

      const result = TokenService.validateRefreshToken(token);

      expect(jwt.verify).toHaveBeenCalledTimes(1);
      expect(jwt.verify).toHaveBeenCalledWith(
        token,
        process.env.JWT_REFRESH_SECRET
      );
      expect(result).toEqual(userData);
    });

    it("should return null if refresh token is invalid", () => {
      const token = "invalid-refresh-token";
      jwt.verify.mockImplementationOnce(() => {
        throw new Error();
      });

      const result = TokenService.validateRefreshToken(token);

      expect(jwt.verify).toHaveBeenCalledTimes(1);
      expect(jwt.verify).toHaveBeenCalledWith(
        token,
        process.env.JWT_REFRESH_SECRET
      );
      expect(result).toBeNull();
    });
  });
  describe("saveToken", () => {
    it("should save token in the database", async () => {
      const id = 1;
      const accessToken = "access-token";
      const refreshToken = "refresh-token";
      User.update.mockResolvedValue([1]);

      await TokenService.saveToken(id, refreshToken, accessToken);

      expect(User.update).toHaveBeenCalledTimes(1);
      expect(User.update).toHaveBeenCalledWith(
        { accessToken: accessToken, refreshToken: refreshToken },
        { where: { id: id } }
      );
    });

    it("should throw ApiError if saving token fails", async () => {
      const id = 1;
      const accessToken = "access-token";
      const refreshToken = "refresh-token";
      const error = new Error("Database error");
      User.update.mockRejectedValue(error);

      await expect(
        TokenService.saveToken(id, refreshToken, accessToken)
      ).rejects.toThrow(ApiError);
    });
  });

  describe("removeToken", () => {
    it("should remove token from the database", async () => {
      const accessToken = "access-token";
      const refreshToken = "refresh-token";
      User.update.mockResolvedValue([1]);

      await TokenService.removeToken(accessToken, refreshToken);

      expect(User.update).toHaveBeenCalledTimes(1);
      expect(User.update).toHaveBeenCalledWith(
        { accessToken: null, refreshToken: null },
        { where: { accessToken: accessToken, refreshToken: refreshToken } }
      );
    });

    it("should throw ApiError if removing token fails", async () => {
      const accessToken = "access-token";
      const refreshToken = "refresh-token";
      const error = new Error("Database error");
      User.update.mockRejectedValue(error);

      await expect(
        TokenService.removeToken(accessToken, refreshToken)
      ).rejects.toThrow(ApiError);
    });
  });

  describe("findToken", () => {
    it("should find token in the database", async () => {
      const refreshToken = "refresh-token";
      const tokenData = { id: 1, refreshToken: refreshToken };
      User.findOne.mockResolvedValue(tokenData);

      const foundToken = await TokenService.findToken(refreshToken);

      expect(User.findOne).toHaveBeenCalledTimes(1);
      expect(User.findOne).toHaveBeenCalledWith({ refreshToken: refreshToken });
      expect(foundToken).toEqual(tokenData);
    });
  });
});
