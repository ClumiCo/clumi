import express from 'express';
import IProvider from "./iprovider"
import AbstractServiceType from '../service_types';

class DefaultProvider implements IProvider {
    protected _name: string;

    constructor() {
        this._name = "np";
      }

    name(): string { return this._name; };

    runCommand(commandString: string): Promise<boolean>
    {
        return new Promise((resolve, reject) => {
            // Perform some asynchronous operation
            // ...
      
            // If the operation is successful, resolve the Promise with `true`
            resolve(true);
      
            // If the operation fails, reject the Promise with an error
            // reject(new Error('Operation failed'));
          });
    }
    ApiHandler = (req: express.Request, res: express.Response): void => {
        if (req.method === 'GET') {
            // Handle GET request
          } else if (req.method === 'POST') {
            // Handle POST request
          } else if (req.method === 'PUT') {
            // Handle PUT request
          } else if (req.method === 'DELETE') {
            // Handle DELETE request
          } else {
            res.status(405).json({
              error: `Method ${req.method} not allowed.`
            });
          }
        
        res.status(200).json({
            status: 'OK',
            message: `hello ${this.name()}`,
            version: '1.0.0'
          });      
    };
};

export default DefaultProvider;

