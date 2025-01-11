import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { TestModule } from "../src/test.module";
import { UsersService } from "../src/users/users.service";

describe("Users Controller", () => {
  let app: INestApplication;
  let usersService: UsersService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    usersService = moduleFixture.get<UsersService>(UsersService);
    await app.init();
  });

  beforeEach(async () => {
    await usersService.deleteAll();
  });

  afterAll(async () => {
    await app.close();
  });

  it("/users (POST) - create a new user", async () => {
    //  1) Arrange : Set up data for the test
    const userDto = {
      name: "Susanne Nielsen",
      email: "susanne@email.com",
      password: "secret",
    };

    //   2) Act : Execute the action to be tested
    const response = await request(app.getHttpServer())
      .post("/users")
      .send(userDto)
      .expect(201);

    //    3) Assert : Check if the action works as expected
    expect(response.body).toHaveProperty("_id");
    expect(response.body.name).toBe(userDto.name);
    expect(response.body.email).toBe(userDto.email);
  });

  it("/users/:id (PATCH) - update user profile", async () => {
    const createUserDto = {
      name: "Susanne Nielsen",
      email: "susanne@email.com",
      password: "secret",
    };

    const createUserResponse = await request(app.getHttpServer())
      .post("/users")
      .send(createUserDto)
      .expect(201);

    const createdUserId = createUserResponse.body._id;

    const updatedUserDto = {
      name: "Susanne Updated",
      email: "susanne.updated@email.com",
    };

    const response = await request(app.getHttpServer())
      .patch(`/users/${createdUserId}`)
      .send(updatedUserDto)
      .expect(200);

    expect(response.body).toHaveProperty("_id", createdUserId);
    expect(response.body.name).toBe(updatedUserDto.name);
    expect(response.body.email).toBe(updatedUserDto.email);
  });

  it("/users (GET) - return all users", async () => {
    const userDto1 = {
      name: "Alice",
      email: "alice@example.com",
      password: "password",
    };
    const userDto2 = {
      name: "Bob",
      email: "bob@example.com",
      password: "password",
    };
    await request(app.getHttpServer())
      .post("/users")
      .send(userDto1)
      .expect(201);
    await request(app.getHttpServer())
      .post("/users")
      .send(userDto2)
      .expect(201);

    const response = await request(app.getHttpServer())
      .get("/users")
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);

    expect(response.body.length).toBeGreaterThanOrEqual(2);
    expect(response.body.some((user) => user.name === "Alice")).toBe(true);
    expect(response.body.some((user) => user.name === "Bob")).toBe(true);
  });
});
