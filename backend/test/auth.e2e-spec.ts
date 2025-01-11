import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, HttpStatus } from "@nestjs/common";
import * as request from "supertest";
import { TestModule } from "../src/test.module";
import { UsersService } from "../src/users/users.service";

describe("Auth Controller", () => {
  let app: INestApplication;
  let usersService: UsersService;
  let authToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    usersService = moduleFixture.get<UsersService>(UsersService);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("/auth/login (POST) - valid login returns token", async () => {
    await usersService.deleteAll();
    const userDto = {
      name: "Andy",
      email: "andy@email.com",
      password: "secret",
    };

    const response = await request(app.getHttpServer())
      .post("/users")
      .send(userDto)
      .expect(201);

    expect(response.body).toHaveProperty("_id");
    expect(response.body.name).toBe(userDto.name);
    expect(response.body.email).toBe(userDto.email);
  });
});
