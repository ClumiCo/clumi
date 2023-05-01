import express from 'express';
import AbstractServiceType from '../service_types';
interface IProvider {
    name(): string;
    runCommand(commandString: string): Promise<boolean>;
    ApiHandler(req: express.Request, res: express.Response): void;
};

export default IProvider;