import IProvider from './iprovider';
import AWSProvider from './awsprovider';
import AZProvider from './azprovider';
import OCIProvider from './ociprovider';
import NimbellaProvider from './nimprovider';
import OpenStackProvider from './osprovider';
import DefaultProvider from './defaultProvider';
import TestProvider from './testprovider';

export function getProvider(providername: string): IProvider | undefined {
    switch (providername) {
      case "aws":
        return new AWSProvider();
      case 'az':
        return new AZProvider();
      case 'oci': // Oracle cloud provider emulator
        return new OCIProvider();
      case 'nim': // Nimbella cloud provider emulator
        return new NimbellaProvider();
      case 'openstack': // OpenStack cloud provider emulator
        return new OpenStackProvider();
      case 'test': // test hook
        return new TestProvider();
      case 'np': // No specific provider, use generic emulator
        default:
    }
    return new DefaultProvider();
  }

