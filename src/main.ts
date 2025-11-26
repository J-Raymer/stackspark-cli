import { selectStack } from './config/stacks';
import { parseNewArgs } from './cli/parseNewArgs';
import { generateProject } from './commands/new';

export async function run(argv: string[]) {
  const [command, ...rest] = argv;

  if (!command || command === 'help' || command === '--help' || command === '-h') {
    printHelp();
    return;
  }

  switch (command) {
    case 'new':
      await handleNew(rest);
      break;

    default:
      console.error(`Unknown command: ${command}`);
      process.exitCode = 1;
  }
}

function printHelp() {
  console.log(`StackSpark-CLI

Usage:
  stackspark new <project-name> [options]

MVP (current):
  - Only 'new' command is recognized
  - Defaults: monolith + React + Express + SQLite
`);
}

async function handleNew(args: string[]) {
    let projectName: string;
    let stackInput: Parameters<typeof selectStack>[0];
  
    try {
      const parsed = parseNewArgs(args);
      projectName = parsed.projectName;
      stackInput = parsed.stackInput;
    } catch (err) {
      if ((err as Error).message === 'missing-project-name') {
        console.error('Error: missing <project-name>');
        console.error('Usage: stackspark new <project-name> [options]');
        process.exitCode = 1;
        return;
      }
      throw err;
    }
  
    // For now, we ignore stackInput inside selectStack; it just returns defaults.
    const stack = selectStack(stackInput);
  
    console.log(`Creating project '${projectName}' with:`);
    console.log(`- template: ${stack.template}`);
    console.log(`- frontend: ${stack.frontend}`);
    console.log(`- backend: ${stack.backend}`);
    console.log(`- database: ${stack.database}`);
    console.log(`- saas: ${stack.saas ? 'enabled' : 'disabled'}`);
  
    await generateProject(projectName, stack);
  
    console.log('\n(Note: Only README.md is generated so far.)');
  }