import Activities from "../../../src/entities/Activities";
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

describe("ActivitiesUsers.getByActivityId", () => {
  it("should return one activity", async () => {
    const activity = {} as Activities;
    jest.spyOn(Activities, "findOne").mockImplementationOnce(async () => {
      return activity;
    });
    const result = await Activities.getByActivityId(Number());
    expect(result).toEqual(activity);
  });
});

describe("ActivitiesUsers.getActivities", () => {
  it("should return array of activities", async () => {
    const activities = Array(10) as Activities[];
    jest.spyOn(Activities, "find").mockImplementationOnce(async () => {
      return activities;
    });
    const result = await Activities.getActivities();
    expect(result).toEqual(activities);
  });
});

describe("ActivitiesUsers.updateVacancy", () => {
  it("should update activity vacancy", async () => {
    jest.spyOn(Activities, "findOne").mockImplementationOnce(async () => ({} as Activities));
    const result = () => Activities.updateVacancy({} as ActivityUser);
    expect(result).resolves;
  });
});
