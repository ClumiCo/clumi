import * as fs from 'fs';
import * as yaml from 'js-yaml';
import axios from 'axios';
import { readConfig, writeConfig } from '../model/config-utils';
import ClumiAPI from "../api/clumi";
import AbstractServiceType from '../model/service_types';

const configPath = 'config.yaml';

async function CheckAndStartClumiAPIServer(config: any, timeout: number = 10000): Promise<ClumiAPI> {
  const apiUrl = `http://localhost:${config.ClumiAPI?.port || 3000}`;

  try {
    // Make a request to the ClumiAPI to check if it is running
    const response = await axios.request({
      method: 'get',
      url: `${apiUrl}/status`,
      headers: {},
      data: {},
      timeout, // use the timeout value passed to the function
    });

    console.log(`ClumiAPI is running at ${apiUrl}`);

    // Create a new ClumiAPI object
    const clumiAPI = new ClumiAPI(config);
    return clumiAPI;
  } catch (err: any) {
    //console.error(`Failed to connect to ClumiAPI at ${apiUrl}: ${err.message}`);
    console.log(`Starting ClumiAPI at ${apiUrl}`);

    // Start the ClumiAPI server
    const clumiAPI = new ClumiAPI(config);
    await clumiAPI.start();

    console.log(`ClumiAPI started at ${apiUrl}`);
    return clumiAPI;
  }
}


async function CallClumiAPIServer(args: string[]): Promise<void> {
  const config = readConfig();
  let command: string;

  // Check if the ClumiAPI is running and start it if it is not
  const clumiAPI = await CheckAndStartClumiAPIServer(config);

  // Construct the URL for the ClumiAPI
  const path = `args.slice(1).join('/')`;
  const baseUrl = `http://localhost:${config.ClumiAPI?.port || 3000}/${args[0]}`;
  console.log(baseUrl);

  try {
    // Make the request to the ClumiAPI with a 10 second timeout
    const response = await Promise.race([
      axios.request({
        method: 'POST',
        url: `${baseUrl}`,
        headers: {},
        data: {},
      }),
      new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('Request timed out after 10 seconds'));
        }, 10000);
      }),
    ]);

    // Output the response from the ClumiAPI
    console.log((response as any).data);
  } catch (err) {
    console.error(err);
  } finally {
    // Stop the ClumiAPI server
    // TODO: we should provide a command to shut all servers
  }
}

async function ParseInputAndCallAPIService(args: string[]): Promise<void> {
  type Provider = 'aws' | 'az' | 'oci' | 'nim' | 'openstack' | 'np' | 'test';
  const defaultProvider = "np";

  const config = readConfig();
  let provider: Provider = defaultProvider;
  let command: string;

  switch (args[0]) {
    case 'aws':
      provider = 'aws'; // AWS provider emulator
      break;
    case 'az':
      provider = 'az'; // Azure provider emulator
      break;
    case 'oci': // Oracle cloud provider emulator
      provider = 'oci';
      break;
    case 'nim': // Nimbella cloud provider emulator
      provider = 'nim';
      break;
    case 'openstack': // OpenStack cloud provider emulator
      provider = 'openstack';
      break;
    case 'np': // No specific provider, use generic emulator
      provider = 'np';
      break;
    case 'clitest': // local unit test
      break;
    case 'test': // test server
      provider = 'test';
      // NYI
      let result = await CallClumiAPIServer(args);
      //
      break;
    default:
      provider = defaultProvider;
  }

  // Unit testing
  command = args.slice(1).join(' ');
  console.log(`Running clumi with provider '${provider}' and command '${command}'`);
  return new Promise((resolve, reject) => {
    // Perform some asynchronous operation
    // ...

    // If the operation is successful, resolve the Promise with `true`
    resolve();
    process.exit(0);

    // If the operation fails, reject the Promise with an error
    // reject(new Error('Operation failed'));
  });
  }

ParseInputAndCallAPIService(process.argv.slice(2));

export { CallClumiAPIServer, ParseInputAndCallAPIService };
