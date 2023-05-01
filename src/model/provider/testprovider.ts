import DefaultProvider from "./defaultProvider"

class TestProvider extends DefaultProvider {
    
    constructor() {
        super();
        this._name = "Test";
      }
};

export default TestProvider;

