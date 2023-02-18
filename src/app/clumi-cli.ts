import prompts from 'prompts';

type Provider = 'aws' | 'az' | 'oci' | 'nim'| 'np';

async function clumi(args: string[]): Promise<void> {
  let provider: Provider = 'np';
  let command: string;

  switch (args[0]) {
    case 'aws':
      provider = 'aws'; // AWS provider emulator
      command = args.slice(1).join(' ');
      break;
    case 'az':
      provider = 'az'; // Azure provider emulator
      command = args.slice(1).join(' ');
      break;
    case 'oci': // Oracle cloud provider emulator
      provider = 'oci';
      command = args.slice(1).join(' ');
      break;
    case 'nim': // Nimbella cloud provider emulator
      provider = 'nim';
      command = args.slice(1).join(' ');
      break;
    case 'np': // No specific provider, use generic emulator
      provider = 'np';
      command = args.slice(1).join(' ');
      break;
    default:
      console.error(`Unknown provider ${args[0]}`);
      return;
  }

  try {
    const { command: userCommand } = await prompts({
      type: 'text',
      name: 'command',
      message: `Enter the command for ${provider}`,
      initial: command,
    });
    console.log(`Running clumi with provider '${provider}' and command '${userCommand}'`);
  } catch (err) {
    console.error('Error while executing prompts', err);
  }
}

clumi(process.argv.slice(2));

export { clumi };
