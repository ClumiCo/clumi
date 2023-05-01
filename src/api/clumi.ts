import express from 'express';
import http from 'http';
import axios from 'axios';
import { getProvider } from '../model/provider/provider-utils';
import IProvider from '../model/provider/iprovider';
import AbstractServiceType from '../model/service_types';
import { Config } from "../model/config";

class ClumiAPI {
  private app: express.Application;
  private server?: http.Server;
  private readonly config?: Config;

  constructor(config: any) {
    this.app = express();
    this.config = config;

    // Implement the method later in the class definition
    this.handleStatus = (req, res) => {
      res.send({ status: 'ok' });
    };

    this.app.get('/status', this.handleStatus);

    const providerNames = ['aws', 'az', 'oci', 'nim', 'openstack', 'np', 'test'];
    providerNames.forEach(providerName => {
      const provider = getProvider(providerName);
      if (provider) {
        console.debug(`setting up http://localhost:6375/${provider.name()}/`)
        this.app.use(`/${provider.name()}`, provider.ApiHandler);
      }
    });

    // Add routes for ClumiAPI methods
    this.app.post('/deploy/:serviceName', this.handleDeploy);
    this.app.post('/undeploy/:serviceName', this.handleUndeploy);
  }

  private handleDeploy(req: express.Request, res: express.Response) {
    // Handle the deploy method
  }

  private handleUndeploy(req: express.Request, res: express.Response) {
    // Handle the undeploy method
  }

  private handleStatus(req: express.Request, res: express.Response) {
    res.status(200).json({
      status: 'OK',
      message: 'ClumiAPI is running!',
      version: '1.0.0'
    });
  }

  start() {
      // Start the server
      this.server = this.app.listen(this.config?.ClumiAPI?.port || 3000, () => {
        console.log(`ClumiAPI listening on port ${this.config?.ClumiAPI?.port || 3000}`);
      });
    }
  
    stop() {
      if (this.server) {
        this.server.close();
      }
    }

    runCommandForTest(name:string, type:string, provider:string): Promise<boolean>{
      console.log(`Creating ${name} of type ${type} for provider ${provider}`);
      return new Promise((resolve, reject) => {
          // Perform some asynchronous operation
          // ...
    
          // If the operation is successful, resolve the Promise with `true`
          resolve(true);
    });
  }

}

export default ClumiAPI;
