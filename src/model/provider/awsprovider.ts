import DefaultProvider from "./defaultProvider"
import AbstractServiceType from '../service_types';

class AWSProvider extends DefaultProvider {
        
    constructor() {
        super();
        this._name = "aws";
      }

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
};

export default AWSProvider;

