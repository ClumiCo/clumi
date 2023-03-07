import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { clumi } from './clumi-cli';
import { readConfig, writeConfig } from './config-utils';

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

  it('should set provider and command for OpenStack', async () => {
    const args = ['openstack', 'create', 'my-service'];
    await clumi(args);
    expect(logSpy).toBeCalledWith("Running clumi with provider 'openstack' and command 'create my-service'");
  });

  it('should handle generic no provider', async () => {
    const args = ['np', 'create', 'my-service'];
    await clumi(args);
    expect(logSpy).toBeCalledWith("Running clumi with provider 'np' and command 'create my-service'");
  });
});

describe('writeConfig', () => {
  it('should write config to file', () => {
    const config = { ClumiAPI: { port: 4321 } };
    writeConfig(config);
    const yamlString = fs.readFileSync('config.yaml', 'utf8');
    const result = yaml.load(yamlString);
    expect(result).toEqual(config);
    fs.unlinkSync('config.yaml');
  })
});

describe('readConfig', () => {
  it('should read config from file when file exists', () => {
    const config = { ClumiAPI: { port: 1234 } };
    const yamlString = yaml.dump(config);
    fs.writeFileSync('config.yaml', yamlString, 'utf8');
    const result = readConfig();
    expect(result).toEqual(config);
    fs.unlinkSync('config.yaml');
  });

  it('should return default config when file does not exist', () => {
    const result = readConfig();
    expect(result).toEqual({ ClumiAPI: { port: 6375 } });
  });

  it('should return default config when file is empty', () => {
    fs.writeFileSync('config.yaml', '', 'utf8');
    let result = readConfig();
    console.log('readConfig:', result);

    expect(result).toEqual({ ClumiAPI: { port: 6375 } });
     fs.unlinkSync('config.yaml');
  });

  it('should return default config when file is invalid YAML', () => {
    fs.writeFileSync('config.yaml', '}{', 'utf8'); // invalid yaml
    let result = readConfig();
    console.log('readConfig:', result);

    expect(result).toEqual({ ClumiAPI: { port: 6375 } });
    fs.unlinkSync('config.yaml');
  });
});

