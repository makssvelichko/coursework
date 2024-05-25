const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { validationResult } = require("express-validator");
const UserController = require("../controllers/userController");
const ApiError = require("../error/ApiError");
const userService = require("../service/userService");

jest.mock("../service/userService");
jest.mock("express-validator");

describe("UserController", () => {
  let app, res, next;

  beforeEach(() => {
    app = express();
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.post("/register", UserController.registration);
    app.post("/login", UserController.login);
    app.post("/logout", UserController.logout);
    app.get("/activate/:link", UserController.activate);
    app.get("/refresh", UserController.refresh);
    app.put("/update", (req, res, next) => {
      req.user = { id: 1 }; // Імітація авторизованого користувача
      UserController.update(req, res, next);
    });
    app.get("/load", (req, res, next) => {
      req.user = { id: 1 }; // Імітація авторизованого користувача
      UserController.load(req, res, next);
    });
    res = {
      cookie: jest.fn(),
      clearCookie: jest.fn(),
      json: jest.fn(),
      redirect: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("registration", () => {
    it("should register a user and set cookies", async () => {
      const userData = {
        accessToken: "accessToken",
        refreshToken: "refreshToken",
      };

      validationResult.mockReturnValue({
        isEmpty: () => true,
      });

      userService.registration.mockResolvedValue(userData);

      const response = await request(app).post("/register").send({
        username: "testuser",
        email: "test@example.com",
        password: "password",
        sex: "male",
        age: 25,
        weight: 70,
        height: 175,
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(userData);
    });

    it("should handle validation errors", async () => {
      validationResult.mockReturnValue({
        isEmpty: () => false,
        array: () => [{ msg: "Validation error" }],
      });

      const response = await request(app).post("/register").send({});

      expect(response.status).toBe(404);
    });
  });

  describe("login", () => {
    it("should log in a user and set cookies", async () => {
      const userData = {
        accessToken: "accessToken",
        refreshToken: "refreshToken",
      };

      userService.login.mockResolvedValue(userData);

      const response = await request(app)
        .post("/login")
        .send({ email: "test@example.com", password: "password" });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(userData);
    });

    it("should handle login errors", async () => {
      const error = new Error("Login failed");

      userService.login.mockRejectedValue(error);

      const response = await request(app)
        .post("/login")
        .send({ email: "test@example.com", password: "password" });

      expect(response.status).toBe(500);
    });
  });

  describe("logout", () => {
    it("should log out a user and clear cookies", async () => {
      userService.logout.mockResolvedValue();

      const response = await request(app)
        .post("/logout")
        .set("Cookie", [
          "accessToken=accessToken",
          "refreshToken=refreshToken",
        ]);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "Logged out successfully" });
    });

    it("should handle missing tokens", async () => {
      userService.logout.mockRejectedValue(
        ApiError.badRequest("Tokens are missing")
      );

      const response = await request(app).post("/logout");

      expect(response.status).toBe(404);
    });
  });

  describe("activate", () => {
    it("should activate a user", async () => {
      userService.activate.mockResolvedValue();

      const response = await request(app).get("/activate/testLink");

      expect(response.status).toBe(302);
    });

    it("should handle activation errors", async () => {
      const error = new Error("Activation failed");

      userService.activate.mockRejectedValue(error);

      const response = await request(app).get("/activate/testLink");

      expect(response.status).toBe(500);
    });
  });

  describe("refresh", () => {
    it("should refresh tokens", async () => {
      const userData = {
        accessToken: "newAccessToken",
        refreshToken: "newRefreshToken",
      };

      userService.refresh.mockResolvedValue(userData);

      const response = await request(app)
        .get("/refresh")
        .set("Cookie", ["refreshToken=refreshToken"]);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(userData);
    });

    it("should handle missing refresh token", async () => {
      const response = await request(app).get("/refresh");

      expect(response.status).toBe(401);
    });
  });

  describe("update", () => {
    it("should update user data", async () => {
      const updatedUser = { id: 1, username: "updatedUser" };

      validationResult.mockReturnValue({
        isEmpty: () => true,
      });

      userService.update.mockResolvedValue(updatedUser);

      const response = await request(app)
        .put("/update")
        .send({ username: "updatedUser" });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedUser);
    });

    it("should handle validation errors", async () => {
      validationResult.mockReturnValue({
        isEmpty: () => false,
        array: () => [{ msg: "Validation error" }],
      });

      const response = await request(app).put("/update").send({});

      expect(response.status).toBe(404);
    });
  });

  describe("load", () => {
    it("should load user data", async () => {
      const userData = {
        username: "testuser",
        sex: "male",
        age: 25,
        weight: 70,
        height: 175,
        profilePhoto: "path/to/photo",
      };

      userService.load.mockResolvedValue(userData);

      const response = await request(app).get("/load");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        username: userData.username,
        sex: userData.sex,
        age: userData.age,
        weight: userData.weight,
        height: userData.height,
        profilePhoto: userData.profilePhoto,
      });
    });

    it("should handle invalid user data", async () => {
      userService.load.mockResolvedValue(null);

      const response = await request(app).get("/load");

      expect(response.status).toBe(404);
    });
  });
});
