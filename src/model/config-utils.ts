import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { Config } from "./config";

const defaultConfiguration = { ClumiAPI: { port: 6375, debug: true } } as Config;

const defaulfConfigPath = 'config.yaml';

export function writeConfig(config: Config, configPathOverride?: string) {
  const path = configPathOverride ?? defaulfConfigPath;
  const yamlString = yaml.dump(config);
  fs.writeFileSync(path, yamlString, 'utf8');
}
  
export function readConfig(configPathOverride?:string): Config {
  try {
    const path = configPathOverride ?? defaulfConfigPath;
    const fileContents = fs.readFileSync(path, 'utf8');

    if (fileContents.length == 0)
    {
        return defaultConfiguration;
    }

    console.log('fileContents:', fileContents);

    return yaml.load(fileContents) as Config;
  } catch (error) {
    return defaultConfiguration;
  }
}

