import * as fs from 'fs';
import * as yaml from 'js-yaml';

interface Config {
  ClumiAPI: { port: number };
}

const defaultConfiguration = { ClumiAPI: { port: 6375 } } as Config;

const configPath = 'config.yaml';

export function writeConfig(config: Config) {
    const yamlString = yaml.dump(config);
    fs.writeFileSync(configPath, yamlString, 'utf8');
}
  
export function readConfig(): Config {
  try {
    const fileContents = fs.readFileSync(configPath, 'utf8');

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

