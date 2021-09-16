import ActivitiesUsers from "../../../src/entities/ActivitiesUsers";
import { ActivityUser } from "../../../src/interfaces/activity";

jest.mock("typeorm", () => {
  return {
    BaseEntity: class MockedBaseEntity {
      static async findOne() {}
      static async find() {}
      static create() {}
      async save() {}
    },
    Entity: () => {},
    PrimaryGeneratedColumn: () => {},
    Column: () => {},
    OneToMany: () => {},
    ManyToOne: () => {},
    JoinColumn: () => {},
    OneToOne: () => {},
  };
});

describe("ActivitiesUsers.getByUserId", () => {
  it("should return array with user activities", async () => {
    const activities = Array(10) as ActivitiesUsers[];
    jest.spyOn(ActivitiesUsers, "find").mockImplementationOnce(async () => activities);
    const result = await ActivitiesUsers.getByUserId(1);
    expect(result).toEqual(activities);
  });
});

describe("ActivitiesUsers.findSpecific", () => {
  it("should return array with user activities", async () => {
    const activities = Array(10) as ActivitiesUsers[];
    jest.spyOn(ActivitiesUsers, "findOne").mockImplementationOnce(async () => activities[0]);
    const result = await ActivitiesUsers.findSpecific({} as ActivityUser);
    expect(result).toEqual(activities[0]);
  });
});

describe("ActivitiesUsers.createOrUpdate", () => {
  it("should create a new user activity if not found one", async () => {
    jest.spyOn(ActivitiesUsers, "findSpecific").mockImplementationOnce(async () => null);
    const result = () => ActivitiesUsers.createOrUpdate({} as ActivityUser);
    expect(result).resolves;
  });
  it("should update user activity if found one", async () => {
    jest.spyOn(ActivitiesUsers, "findSpecific").mockImplementationOnce(async () => ({} as ActivitiesUsers));
    const result = () => ActivitiesUsers.createOrUpdate({} as ActivityUser);
    expect(result).resolves;
  });
});
