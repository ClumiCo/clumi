import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { ParseInputAndCallAPIService } from './clumi-cli';
import { readConfig, writeConfig } from '../model/config-utils';

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
    await ParseInputAndCallAPIService(args);
    expect(logSpy).toBeCalledWith("Running clumi with provider 'aws' and command 's3 mb my-bucket'");
  }, 10000);

  it('should set provider and command for az', async () => {
    const args = ['az', 'storage', 'blob', 'list'];
    await ParseInputAndCallAPIService(args);
    expect(logSpy).toBeCalledWith("Running clumi with provider 'az' and command 'storage blob list'");
  });

  it('should set provider and command for oci', async () => {
    const args = ['oci', 'compute', 'instance', 'list'];
    await ParseInputAndCallAPIService(args);
    expect(logSpy).toBeCalledWith("Running clumi with provider 'oci' and command 'compute instance list'");
  });

  it('should set provider and command for Nimbella', async () => {
    const args = ['nim', 'create', 'my-service'];
    await ParseInputAndCallAPIService(args);
    expect(logSpy).toBeCalledWith("Running clumi with provider 'nim' and command 'create my-service'");
  });

  it('should set provider and command for OpenStack', async () => {
    const args = ['openstack', 'create', 'my-service'];
    await ParseInputAndCallAPIService(args);
    expect(logSpy).toBeCalledWith("Running clumi with provider 'openstack' and command 'create my-service'");
  });

  it('should handle generic no provider', async () => {
    const args = ['np', 'create', 'my-service'];
    await ParseInputAndCallAPIService(args);
    expect(logSpy).toBeCalledWith("Running clumi with provider 'np' and command 'create my-service'");
  });
});
