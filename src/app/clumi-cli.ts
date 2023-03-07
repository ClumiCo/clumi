import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { readConfig, writeConfig } from './config-utils';

type Provider = 'aws' | 'az' | 'oci' | 'nim' | 'openstack' | 'np';
const defaultProvider = "np";

const configPath = 'config.yaml';


async function clumi(args: string[]): Promise<void> {
  const config = readConfig();
  let provider: Provider = defaultProvider;
  let command: string;

  switch (args[0]) {
    case 'aws':
      provider = 'aws'; // AWS provider emulator
      command = args.slice(1).join(' ');
      break;
    case 'az':
      provider = 'az'; // Azure provider emulator
      command = args.slice(1).join(' ');
      break;
    case 'oci': // Oracle cloud provider emulator
      provider = 'oci';
      command = args.slice(1).join(' ');
      break;
    case 'nim': // Nimbella cloud provider emulator
      provider = 'nim';
      command = args.slice(1).join(' ');
      break;
    case 'openstack': // OpenStack cloud provider emulator
      provider = 'openstack';
      command = args.slice(1).join(' ');
      break;
    case 'np': // No specific provider, use generic emulator
      provider = 'np';
      command = args.slice(1).join(' ');
      break;
    default:
      provider = defaultProvider;
      command = args.join(' ');
      // console.error(`Unknown provider ${args[0]}`);
  }

  console.log(`Running clumi with provider '${provider}' and command '${command}'`);
  writeConfig(config);
  return Promise.resolve();
}

clumi(process.argv.slice(2));

export { clumi };
