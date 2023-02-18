import { clumi } from './clumi-cli';

describe('clumi function', () => {
  let logSpy: jest.SpyInstance;

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  it('should set provider and command for aws', async () => {
    const args = ['aws', 's3', 'mb', 'my-bucket'];
    await clumi(args);
    expect(logSpy).toHaveBeenCalledWith("Running clumi with provider 'aws' and command 's3 mb my-bucket'");
  });

  it('should set provider and command for az', async () => {
    const args = ['az', 'storage', 'blob', 'list'];
    await clumi(args);
    expect(logSpy).toHaveBeenCalledWith("Running clumi with provider 'az' and command 'storage blob list'");
  });

  it('should set provider and command for oci', async () => {
    const args = ['oci', 'compute', 'instance', 'list'];
    await clumi(args);
    expect(logSpy).toHaveBeenCalledWith("Running clumi with provider 'oci' and command 'compute instance list'");
  });

  it('should set provider and command for np', async () => {
    const args = ['np', 'service', 'create', 'my-service'];
    await clumi(args);
    expect(logSpy).toHaveBeenCalledWith("Running clumi with provider 'np' and command 'service create my-service'");
  });

  it('should handle unknown provider', async () => {
    const args = ['unknown-provider'];
    await clumi(args);
    expect(logSpy).toHaveBeenCalledWith(`Unknown provider ${args[0]}`);
  });
});
