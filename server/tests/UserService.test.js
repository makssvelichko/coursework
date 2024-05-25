const UserService = require("../service/userService");
const { User } = require("../models/models");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("../service/mailService");
const tokenService = require("../service/tokenService");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../error/ApiError");

jest.mock("../models/models");
jest.mock("bcrypt");
jest.mock("uuid");
jest.mock("../service/mailService");
jest.mock("../service/tokenService");
jest.mock("../dtos/user-dto");

describe("UserService", () => {
  describe("registration", () => {
    it("should register a new user", async () => {
      const mockUser = {
        id: 1,
        username: "testuser",
        email: "test@example.com",
        password: "hashedpassword",
        sex: "male",
        age: 25,
        weight: 70,
        height: 175,
        activationLink: "activation-link",
        profilePhoto: "profilePhoto.jpg",
      };

      User.findOne.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue("hashedpassword");
      uuid.v4.mockReturnValue("activation-link");
      const profilePhoto = { mv: jest.fn().mockResolvedValue(true) };
      User.create.mockResolvedValue(mockUser);
      mailService.sendActivationMail.mockResolvedValue(true);
      const tokens = {
        accessToken: "accessToken",
        refreshToken: "refreshToken",
      };
      tokenService.generateToken.mockReturnValue(tokens);
      tokenService.saveToken.mockResolvedValue(true);
      UserDto.mockImplementation(() => mockUser);

      const result = await UserService.registration(
        "testuser",
        "test@example.com",
        "password",
        "male",
        25,
        70,
        175,
        profilePhoto
      );

      expect(result).toEqual({
        ...tokens,
        user: mockUser,
      });
    });

    it("should throw error if user already exists", async () => {
      User.findOne.mockResolvedValue(true);

      await expect(
        UserService.registration(
          "testuser",
          "test@example.com",
          "password",
          "male",
          25,
          70,
          175,
          {}
        )
      ).rejects.toThrow("User with this test@example.com already exist");
    });
  });

  describe("login", () => {
    it("should login a user", async () => {
      const mockUser = {
        id: 1,
        username: "testuser",
        email: "test@example.com",
        password: "hashedpassword",
      };

      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      const tokens = {
        accessToken: "accessToken",
        refreshToken: "refreshToken",
      };
      tokenService.generateToken.mockReturnValue(tokens);
      tokenService.saveToken.mockResolvedValue(true);
      UserDto.mockImplementation(() => mockUser);

      const result = await UserService.login("test@example.com", "password");

      expect(result).toEqual({
        ...tokens,
        user: mockUser,
      });
    });

    it("should throw error if user is not found", async () => {
      User.findOne.mockResolvedValue(null);

      await expect(
        UserService.login("test@example.com", "password")
      ).rejects.toThrow("Not found user with such email");
    });

    it("should throw error if password is incorrect", async () => {
      const mockUser = {
        id: 1,
        username: "testuser",
        email: "test@example.com",
        password: "hashedpassword",
      };

      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false);

      await expect(
        UserService.login("test@example.com", "password")
      ).rejects.toThrow("Not correct password");
    });
  });

  describe("activate", () => {
    it("should activate a user", async () => {
      const mockUser = { id: 1, isActivated: false };
      User.update.mockResolvedValue([1, [mockUser]]);

      await UserService.activate("activation-link");

      expect(User.update).toHaveBeenCalledWith(
        { isActivated: true },
        { where: { activationLink: "activation-link" } }
      );
    });

    it("should throw error if activation link is invalid", async () => {
      User.update.mockResolvedValue([0]);

      try {
        await UserService.activate("invalid-link");
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect(error.statusCode).toBe(404);
        expect(error.message).toBe("Activation link is invalid");
      }
    });
  });

  describe("logout", () => {
    it("should logout a user", async () => {
      tokenService.removeToken.mockResolvedValue(true);

      await UserService.logout("accessToken", "refreshToken");

      expect(tokenService.removeToken).toHaveBeenCalledWith(
        "accessToken",
        "refreshToken"
      );
    });
  });

  describe("refresh", () => {
    it("should refresh tokens", async () => {
      const mockUser = {
        id: 1,
        username: "testuser",
        email: "test@example.com",
      };
      const mockUserData = { id: 1 };
      const tokens = {
        accessToken: "accessToken",
        refreshToken: "refreshToken",
      };
      tokenService.validateRefreshToken.mockReturnValue(mockUserData);
      tokenService.findToken.mockResolvedValue(true);
      User.findOne.mockResolvedValue(mockUser);
      tokenService.generateToken.mockReturnValue(tokens);
      tokenService.saveToken.mockResolvedValue(true);
      UserDto.mockImplementation(() => mockUser);

      const result = await UserService.refresh("refreshToken");

      expect(result).toEqual({
        ...tokens,
        user: mockUser,
      });
    });

    it("should throw error if refresh token is invalid", async () => {
      tokenService.validateRefreshToken.mockReturnValue(null);

      await expect(UserService.refresh("invalid-refreshToken")).rejects.toThrow(
        ApiError
      );
    });
  });

  describe("update", () => {
    it("should update a user", async () => {
      const updates = { username: "existingusername" };
      User.findOne.mockResolvedValue(false); // Припускаємо, що користувача не знайдено
      User.update.mockResolvedValue([1, [{ id: 1, ...updates }]]);

      try {
        await UserService.update(1, updates);
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError); // Очікуємо виняток типу ApiError
        expect(error.statusCode).toBe(404);
        expect(error.message).toBe("Try another nickname");
      }
    });

    it("should throw error if username already exists", async () => {
      const updates = { username: "existingusername" };
      User.findOne.mockResolvedValue(true);

      await expect(UserService.update(1, updates)).rejects.toThrow(ApiError);
    });

    it("should throw error if user not found", async () => {
      User.update.mockResolvedValue([0]);

      await expect(UserService.update(1, {})).rejects.toThrow(ApiError);
    });
  });

  describe("load", () => {
    it("should load a user", async () => {
      const mockUser = { id: 1, username: "testuser" };
      User.findOne.mockResolvedValue(mockUser);

      const result = await UserService.load(1);

      expect(result).toEqual(mockUser);
    });

    it("should throw error if user not found", async () => {
      User.findOne.mockResolvedValue(null);

      await expect(UserService.load(1)).rejects.toThrow(ApiError);
    });
  });
});
