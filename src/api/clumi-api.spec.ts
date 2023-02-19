import ClumiAPI from "./clumi";
import AbstractServiceType from "../model/service_types";
import IProvider from "../model/iprovider";

describe("ClumiAPI", () => {
  it("should create a service", async () => {
    // Arrange
    const name = "service-name";
    const type = AbstractServiceType.Storage;
    const provider:IProvider = {} as IProvider;

    const clumiApi = new ClumiAPI();

    // Act
    const result = await clumiApi.create(name, type, provider);

    // Assert
    expect(result).toBe(true);
  });
});
