import DefaultProvider from "./defaultProvider"

class OpenStackProvider extends DefaultProvider {
    
    constructor() {
        super();
        this._name = "openstack";
      }
};

export default OpenStackProvider;

