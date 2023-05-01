import ClumiAPI from "./clumi";
import AbstractServiceType from "../model/service_types";
import IProvider from "../model/provider/iprovider";
import { Config, ClumiAPIConfig } from "../model/config";

describe("ClumiAPI", () => {
  it("should create a service", async () => {
    // Arrange
    const name = "service-name";
    const type = "storage";
    const provider = "aws";
    const config: Config = { ClumiAPI: { port: 3000, debug:false } };

    const clumiApi = new ClumiAPI(config);

    // Act
    const result = await clumiApi.runCommandForTest(name, type, provider);

    // Assert
    expect(result).toBe(true);
  });
});
