const { mock } = require("jest-mock-extended");
const { User } = require("../models/models");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("../service/mailService");
const tokenService = require("../service/tokenService");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../error/ApiError");
const path = require("path");
const UserService = require("../service/userService");

jest.mock("../models/models");
jest.mock("bcrypt");
jest.mock("uuid");
jest.mock("../service/mailService");
jest.mock("../service/tokenService");
jest.mock("path");

describe("UserService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("registration", () => {
    it("should register a new user successfully", async () => {
      const mockUser = {
        id: 1,
        username: "testuser",
        email: "test@example.com",
        password: "hashedpassword",
        sex: "male",
        age: 25,
        weight: 70,
        height: 175,
        profilePhoto: "photo.jpg",
        activationLink: "activation-link",
        isActivated: false,
      };

      User.findOne.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue("hashedpassword");
      uuid.v4.mockReturnValue("activation-link");
      const mockProfilePhoto = {
        mv: jest.fn().mockResolvedValue(null),
      };
      path.resolve.mockReturnValue("/some/path/photo.jpg");
      User.create.mockResolvedValue(mockUser);
      mailService.sendActivationMail.mockResolvedValue(null);
      tokenService.generateToken.mockReturnValue({
        accessToken: "access-token",
        refreshToken: "refresh-token",
      });
      tokenService.saveToken.mockResolvedValue(null);

      const result = await UserService.registration(
        "testuser",
        "test@example.com",
        "password",
        "male",
        25,
        70,
        175,
        mockProfilePhoto
      );

      expect(User.findOne).toHaveBeenCalledWith({
        where: { email: "test@example.com" },
      });
      expect(bcrypt.hash).toHaveBeenCalledWith("password", 5);
      expect(uuid.v4).toHaveBeenCalled();
      expect(mockProfilePhoto.mv).toHaveBeenCalledWith("/some/path/photo.jpg");
      expect(User.create).toHaveBeenCalledWith(
        expect.objectContaining({
          username: "testuser",
          email: "test@example.com",
          password: "hashedpassword",
          activationLink: "activation-link",
        })
      );
      expect(mailService.sendActivationMail).toHaveBeenCalledWith(
        "test@example.com",
        `${process.env.API_URL}/api/user/activate/activation-link`
      );
      expect(tokenService.generateToken).toHaveBeenCalledWith(
        expect.objectContaining({ id: mockUser.id })
      );
      expect(tokenService.saveToken).toHaveBeenCalledWith(
        mockUser.id,
        "refresh-token",
        "access-token"
      );
      expect(result).toEqual({
        accessToken: "access-token",
        refreshToken: "refresh-token",
        user: expect.any(UserDto),
      });
    });

    it("should throw error if user already exists", async () => {
      User.findOne.mockResolvedValue({ id: 1, email: "test@example.com" });

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
      ).rejects.toThrow(ApiError);

      expect(User.findOne).toHaveBeenCalledWith({
        where: { email: "test@example.com" },
      });
    });
  });

  describe("activate", () => {
    it("should activate a user successfully", async () => {
      User.update.mockResolvedValue([1, [{ isActivated: true }]]);

      await UserService.activate("activation-link");

      expect(User.update).toHaveBeenCalledWith(
        { isActivated: true },
        { where: { activationLink: "activation-link" } }
      );
    });
  });

  describe("login", () => {
    it("should login a user successfully", async () => {
      const mockUser = {
        id: 1,
        email: "test@example.com",
        password: "hashedpassword",
        isActivated: true,
      };

      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      tokenService.generateToken.mockReturnValue({
        accessToken: "access-token",
        refreshToken: "refresh-token",
      });
      tokenService.saveToken.mockResolvedValue(null);

      const result = await UserService.login("test@example.com", "password");

      expect(User.findOne).toHaveBeenCalledWith({
        where: { email: "test@example.com" },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith("password", "hashedpassword");
      expect(tokenService.generateToken).toHaveBeenCalledWith(
        expect.objectContaining({ id: mockUser.id })
      );
      expect(tokenService.saveToken).toHaveBeenCalledWith(
        mockUser.id,
        "refresh-token",
        "access-token"
      );
      expect(result).toEqual({
        accessToken: "access-token",
        refreshToken: "refresh-token",
        user: expect.any(UserDto),
      });
    });

    it("should throw error if user not found", async () => {
      User.findOne.mockResolvedValue(null);

      await expect(
        UserService.login("test@example.com", "password")
      ).rejects.toThrow(ApiError);

      expect(User.findOne).toHaveBeenCalledWith({
        where: { email: "test@example.com" },
      });
    });

    it("should throw error if password is incorrect", async () => {
      const mockUser = {
        id: 1,
        email: "test@example.com",
        password: "hashedpassword",
        isActivated: true,
      };

      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false);

      await expect(
        UserService.login("test@example.com", "password")
      ).rejects.toThrow(ApiError);

      expect(User.findOne).toHaveBeenCalledWith({
        where: { email: "test@example.com" },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith("password", "hashedpassword");
    });
  });

  describe("logout", () => {
    it("should logout a user successfully", async () => {
      tokenService.removeToken.mockResolvedValue(null);

      await UserService.logout("access-token", "refresh-token");

      expect(tokenService.removeToken).toHaveBeenCalledWith(
        "access-token",
        "refresh-token"
      );
    });
  });

  describe("refresh", () => {
    it("should refresh a user token successfully", async () => {
      const mockUser = {
        id: 1,
        email: "test@example.com",
      };
      const mockTokenData = {
        id: mockUser.id,
      };

      tokenService.validateRefreshToken.mockReturnValue(mockTokenData);
      tokenService.findToken.mockResolvedValue(true);
      User.findOne.mockResolvedValue(mockUser);
      tokenService.generateToken.mockReturnValue({
        accessToken: "access-token",
        refreshToken: "refresh-token",
      });
      tokenService.saveToken.mockResolvedValue(null);

      const result = await UserService.refresh("refresh-token");

      expect(tokenService.validateRefreshToken).toHaveBeenCalledWith(
        "refresh-token"
      );
      expect(tokenService.findToken).toHaveBeenCalledWith("refresh-token");
      expect(User.findOne).toHaveBeenCalledWith({ where: { id: mockUser.id } });
      expect(tokenService.generateToken).toHaveBeenCalledWith(
        expect.objectContaining({ id: mockUser.id })
      );
      expect(tokenService.saveToken).toHaveBeenCalledWith(
        mockUser.id,
        "refresh-token",
        "access-token"
      );
      expect(result).toEqual({
        accessToken: "access-token",
        refreshToken: "refresh-token",
        user: expect.any(UserDto),
      });
    });

    it("should throw error if refresh token is not provided", async () => {
      await expect(UserService.refresh(null)).rejects.toThrow(
        ApiError.UnauthorizedError
      );
    });

    it("should throw error if token validation fails", async () => {
      tokenService.validateRefreshToken.mockReturnValue(null);
      tokenService.findToken.mockResolvedValue(null);

      await expect(
        UserService.refresh("invalid-refresh-token")
      ).rejects.toThrow(ApiError.UnauthorizedError);
    });
  });

  describe("update", () => {
    it("should update user profile successfully", async () => {
      const mockUser = {
        id: 1,
        username: "testuser",
        email: "test@example.com",
      };
      const updates = {
        username: "newusername",
        profilePhoto: {
          mv: jest.fn().mockResolvedValue(null),
        },
      };

      uuid.v4.mockReturnValue("new-photo.jpg");
      path.resolve.mockReturnValue("/some/path/new-photo.jpg");
      User.findOne.mockResolvedValue(null); // No other user with the new username
      User.update.mockResolvedValue([1, [mockUser]]);

      const result = await UserService.update(mockUser.id, updates);

      expect(uuid.v4).toHaveBeenCalled();
      expect(path.resolve).toHaveBeenCalledWith(
        __dirname,
        "..",
        "static",
        "new-photo.jpg"
      );
      expect(updates.profilePhoto.mv).toHaveBeenCalledWith(
        "/some/path/new-photo.jpg"
      );
      expect(User.findOne).toHaveBeenCalledWith({
        where: { username: "newusername" },
      });
      expect(User.update).toHaveBeenCalledWith(
        expect.objectContaining({
          username: "newusername",
          profilePhoto: "new-photo.jpg",
        }),
        {
          where: { id: mockUser.id },
          returning: true,
          plain: true,
        }
      );
      expect(result).toEqual(mockUser);
    });

    it("should throw error if username is already taken", async () => {
      const mockUser = {
        id: 1,
        username: "testuser",
        email: "test@example.com",
      };
      const updates = {
        username: "existinguser",
      };

      User.findOne.mockResolvedValue({ id: 2, username: "existinguser" }); // Another user with the new username

      await expect(UserService.update(mockUser.id, updates)).rejects.toThrow(
        ApiError.badRequest
      );

      expect(User.findOne).toHaveBeenCalledWith({
        where: { username: "existinguser" },
      });
    });

    it("should throw error if no changes made or user not found", async () => {
      User.update.mockResolvedValue([0, []]);

      await expect(UserService.update(1, {})).rejects.toThrow(
        ApiError.badRequest
      );

      expect(User.update).toHaveBeenCalledWith(
        {},
        {
          where: { id: 1 },
          returning: true,
          plain: true,
        }
      );
    });
  });

  describe("load", () => {
    it("should load a user profile successfully", async () => {
      const mockUser = {
        id: 1,
        username: "testuser",
        email: "test@example.com",
      };

      User.findOne.mockResolvedValue(mockUser);

      const result = await UserService.load(mockUser.id);

      expect(User.findOne).toHaveBeenCalledWith({ where: { id: mockUser.id } });
      expect(result).toEqual(mockUser);
    });

    it("should throw error if user not found", async () => {
      User.findOne.mockResolvedValue(null);

      await expect(UserService.load(1)).rejects.toThrow(ApiError.badRequest);

      expect(User.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
  describe("logout", () => {
    it("should logout a user successfully", async () => {
      tokenService.removeToken.mockResolvedValue(null);

      await UserService.logout("access-token", "refresh-token");

      expect(tokenService.removeToken).toHaveBeenCalledWith(
        "access-token",
        "refresh-token"
      );
    });
  });

  describe("refresh", () => {
    it("should refresh a user token successfully", async () => {
      const mockUser = {
        id: 1,
        email: "test@example.com",
      };
      const mockTokenData = {
        id: mockUser.id,
      };

      tokenService.validateRefreshToken.mockReturnValue(mockTokenData);
      tokenService.findToken.mockResolvedValue(true);
      User.findOne.mockResolvedValue(mockUser);
      tokenService.generateToken.mockReturnValue({
        accessToken: "access-token",
        refreshToken: "refresh-token",
      });
      tokenService.saveToken.mockResolvedValue(null);

      const result = await UserService.refresh("refresh-token");

      expect(tokenService.validateRefreshToken).toHaveBeenCalledWith(
        "refresh-token"
      );
      expect(tokenService.findToken).toHaveBeenCalledWith("refresh-token");
      expect(User.findOne).toHaveBeenCalledWith({ where: { id: mockUser.id } });
      expect(tokenService.generateToken).toHaveBeenCalledWith(
        expect.objectContaining({ id: mockUser.id })
      );
      expect(tokenService.saveToken).toHaveBeenCalledWith(
        mockUser.id,
        "refresh-token",
        "access-token"
      );
      expect(result).toEqual({
        accessToken: "access-token",
        refreshToken: "refresh-token",
        user: expect.any(UserDto),
      });
    });

    it("should throw error if refresh token is not provided", async () => {
      await expect(UserService.refresh(null)).rejects.toThrow(
        ApiError.UnauthorizedError
      );
    });

    it("should throw error if token validation fails", async () => {
      tokenService.validateRefreshToken.mockReturnValue(null);
      tokenService.findToken.mockResolvedValue(null);

      await expect(
        UserService.refresh("invalid-refresh-token")
      ).rejects.toThrow(ApiError.UnauthorizedError);
    });
  });

  describe("update", () => {
    it("should update user profile successfully", async () => {
      const mockUser = {
        id: 1,
        username: "testuser",
        email: "test@example.com",
      };
      const updates = {
        username: "newusername",
        profilePhoto: {
          mv: jest.fn().mockResolvedValue(null),
        },
      };

      uuid.v4.mockReturnValue("new-photo.jpg");
      path.resolve.mockReturnValue("/some/path/new-photo.jpg");
      User.findOne.mockResolvedValue(null); // No other user with the new username
      User.update.mockResolvedValue([1, [mockUser]]);

      const result = await UserService.update(mockUser.id, updates);

      expect(uuid.v4).toHaveBeenCalled();
      expect(path.resolve).toHaveBeenCalledWith(
        __dirname,
        "..",
        "static",
        "new-photo.jpg"
      );
      expect(updates.profilePhoto.mv).toHaveBeenCalledWith(
        "/some/path/new-photo.jpg"
      );
      expect(User.findOne).toHaveBeenCalledWith({
        where: { username: "newusername" },
      });
      expect(User.update).toHaveBeenCalledWith(
        expect.objectContaining({
          username: "newusername",
          profilePhoto: "new-photo.jpg",
        }),
        {
          where: { id: mockUser.id },
          returning: true,
          plain: true,
        }
      );
      expect(result).toEqual(mockUser);
    });

    it("should throw error if username is already taken", async () => {
      const mockUser = {
        id: 1,
        username: "testuser",
        email: "test@example.com",
      };
      const updates = {
        username: "existinguser",
      };

      User.findOne.mockResolvedValue({ id: 2, username: "existinguser" }); // Another user with the new username

      await expect(UserService.update(mockUser.id, updates)).rejects.toThrow(
        ApiError.badRequest
      );

      expect(User.findOne).toHaveBeenCalledWith({
        where: { username: "existinguser" },
      });
    });

    it("should throw error if no changes made or user not found", async () => {
      User.update.mockResolvedValue([0, []]);

      await expect(UserService.update(1, {})).rejects.toThrow(
        ApiError.badRequest
      );

      expect(User.update).toHaveBeenCalledWith(
        {},
        {
          where: { id: 1 },
          returning: true,
          plain: true,
        }
      );
    });
  });

  describe("load", () => {
    it("should load a user profile successfully", async () => {
      const mockUser = {
        id: 1,
        username: "testuser",
        email: "test@example.com",
      };

      User.findOne.mockResolvedValue(mockUser);

      const result = await UserService.load(mockUser.id);

      expect(User.findOne).toHaveBeenCalledWith({ where: { id: mockUser.id } });
      expect(result).toEqual(mockUser);
    });

    it("should throw error if user not found", async () => {
      User.findOne.mockResolvedValue(null);

      await expect(UserService.load(1)).rejects.toThrow(ApiError.badRequest);

      expect(User.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
});
