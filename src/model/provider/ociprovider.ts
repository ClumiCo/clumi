import DefaultProvider from "./defaultProvider"

class OCIProvider extends DefaultProvider {
    
    constructor() {
        super();
        this._name = "oci";
      }
};

export default OCIProvider;

