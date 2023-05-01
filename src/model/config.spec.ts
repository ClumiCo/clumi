import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { readConfig, writeConfig } from './config-utils';

describe('Config:writeConfig', () => {
    it('should write config to file', () => {
        const config = { ClumiAPI: { port: 4321, debug: true } };
        const tempConfigPath = 'temp-config.yaml';
        writeConfig(config, tempConfigPath);
        const yamlString = fs.readFileSync(tempConfigPath, 'utf8');
        const result = yaml.load(yamlString);
        expect(result).toEqual(config);
        fs.unlinkSync(tempConfigPath);
    })
});

describe('Config:readConfig', () => {
    it('should read config from file when file exists', () => {
        const config = { ClumiAPI: { port: 1234, debug: true } };
        const yamlString = yaml.dump(config);
        const tempConfigPath = 'temp-config.yaml';
        fs.writeFileSync(tempConfigPath, yamlString, 'utf8');
        const result = readConfig(tempConfigPath);
        expect(result).toEqual(config);
        fs.unlinkSync(tempConfigPath);
    });

    it('should return default config when file does not exist', () => {
        const result = readConfig('non-existing-file.yaml');
        expect(result).toEqual({ ClumiAPI: { port: 6375, debug: true } });
    });

    it('should return default config when file is empty', () => {
        fs.writeFileSync('config.yaml', '', 'utf8');
        let result = readConfig();
        console.log('readConfig:', result);

        expect(result).toEqual({ ClumiAPI: { port: 6375, debug: true } });
        fs.unlinkSync('config.yaml');
    });

    it('should return default config when file is invalid YAML', () => {
        fs.writeFileSync('config.yaml', '}{', 'utf8'); // invalid yaml
        let result = readConfig();
        console.log('readConfig:', result);

        expect(result).toEqual({ ClumiAPI: { port: 6375, debug: true } });
        fs.unlinkSync('config.yaml');
    });
});


