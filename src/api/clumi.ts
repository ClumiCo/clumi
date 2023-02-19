import IProvider from "../model/iprovider";
import AbstractServiceType from "../model/service_types"

class ClumiAPI {
    create (name:string, type:AbstractServiceType, provider:IProvider): Promise<boolean> {
        console.log(`Creating ${name} of type ${type} for provider ${provider}`);
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

export default ClumiAPI;
