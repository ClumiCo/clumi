import { expect } from 'chai';
import ClumiAPI from '../api/clumi';
import AWSProvider from "../model/awsprovider";
import AbstractServiceType from "../model/service_types"


describe('Clumi create', () => {
    it('should create a cloud service with the provided options', () => {
        const name = 'my-service';
        const type = AbstractServiceType.Storage;
        const provider = new AWSProvider;

        const thisClumi = new ClumiAPI;

        let logs: string[] = [];
        const log = console.log;
        console.log = (...args: any[]) => logs.push(...args.map(arg => arg.toString()));
        thisClumi.create(name, type, provider);
        console.log = log;
        expect(logs[0]).to.include(`Creating ${name} of type ${type} for provider ${provider}`);
    });
});
