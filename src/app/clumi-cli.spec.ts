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
    expect(logSpy).toBeCalledWith("Running clumi with provider 'aws' and command 's3 mb my-bucket'");
  }, 10000);

  it('should set provider and command for az', async () => {
    const args = ['az', 'storage', 'blob', 'list'];
    await clumi(args);
    expect(logSpy).toBeCalledWith("Running clumi with provider 'az' and command 'storage blob list'");
  });

  it('should set provider and command for oci', async () => {
    const args = ['oci', 'compute', 'instance', 'list'];
    await clumi(args);
    expect(logSpy).toBeCalledWith("Running clumi with provider 'oci' and command 'compute instance list'");
  });

  it('should set provider and command for Nimbella', async () => {
    const args = ['nim', 'create', 'my-service'];
    await clumi(args);
    expect(logSpy).toBeCalledWith("Running clumi with provider 'nim' and command 'create my-service'");
  });

  it('should handle generic no provider', async () => {
    const args = ['np', 'create', 'my-service'];
    await clumi(args);
    expect(logSpy).toBeCalledWith("Running clumi with provider 'np' and command 'create my-service'");
  });
});
